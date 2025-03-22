import { supabase } from '../../lib/supabase';
import { PaymentService } from './paymentService';

export class SubscriptionService {
  static async createSubscription(params: {
    userId: string;
    amount: number;
    billingCycle: 'daily' | 'weekly' | 'monthly' | 'annual';
    metadata?: Record<string, any>;
  }): Promise<any> {
    const { userId, amount, billingCycle, metadata } = params;

    const nextBillingDate = this.calculateNextBillingDate(billingCycle);

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        amount,
        billing_cycle: billingCycle,
        next_billing_date: nextBillingDate,
        metadata
      })
      .select()
      .single();

    if (error) throw error;
    return subscription;
  }

  static async processSubscriptionPayment(subscriptionId: string): Promise<void> {
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', subscriptionId)
      .single();

    if (error) throw error;
    if (!subscription) throw new Error('Subscription not found');

    try {
      // Process payment
      await PaymentService.initializePayment({
        amount: subscription.amount,
        recipientAddress: subscription.metadata.recipient_address,
        network: 'mainnet',
        description: `Subscription payment for ${subscription.id}`,
        metadata: {
          subscription_id: subscription.id,
          billing_cycle: subscription.billing_cycle
        }
      });

      // Update subscription
      await supabase
        .from('subscriptions')
        .update({
          last_payment_date: new Date().toISOString(),
          next_billing_date: this.calculateNextBillingDate(subscription.billing_cycle),
          retry_count: 0
        })
        .eq('id', subscription.id);

    } catch (error) {
      // Handle failed payment
      await this.handleFailedPayment(subscription);
      throw error;
    }
  }

  static async cancelSubscription(subscriptionId: string): Promise<void> {
    const { error } = await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('id', subscriptionId);

    if (error) throw error;
  }

  private static calculateNextBillingDate(billingCycle: string): string {
    const now = new Date();
    switch (billingCycle) {
      case 'daily':
        now.setDate(now.getDate() + 1);
        break;
      case 'weekly':
        now.setDate(now.getDate() + 7);
        break;
      case 'monthly':
        now.setMonth(now.getMonth() + 1);
        break;
      case 'annual':
        now.setFullYear(now.getFullYear() + 1);
        break;
    }
    return now.toISOString();
  }

  private static async handleFailedPayment(subscription: any): Promise<void> {
    const maxRetries = 3;
    const retryCount = subscription.retry_count + 1;

    if (retryCount <= maxRetries) {
      // Schedule retry
      await supabase
        .from('subscriptions')
        .update({
          retry_count: retryCount,
          next_billing_date: this.calculateRetryDate(retryCount)
        })
        .eq('id', subscription.id);
    } else {
      // Cancel subscription after max retries
      await this.cancelSubscription(subscription.id);
    }
  }

  private static calculateRetryDate(retryCount: number): string {
    const now = new Date();
    // Exponential backoff: 1 day, 3 days, 7 days
    const daysToAdd = Math.pow(2, retryCount) - 1;
    now.setDate(now.getDate() + daysToAdd);
    return now.toISOString();
  }
}
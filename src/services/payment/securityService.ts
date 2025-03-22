import { supabase } from '../../lib/supabase';
import { PaymentError } from './types';

export class SecurityService {
  private static readonly MAX_ATTEMPTS = 3;
  private static readonly LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes
  private static readonly HIGH_VALUE_THRESHOLD = 1; // 1 BTC

  static async logSecurityEvent(params: {
    userId: string;
    action: string;
    ipAddress: string;
    userAgent: string;
    metadata?: Record<string, any>;
  }): Promise<void> {
    const { error } = await supabase
      .from('security_logs')
      .insert(params);

    if (error) throw error;
  }

  static async validateHighValueTransaction(amount: number, userId: string): Promise<void> {
    if (amount >= this.HIGH_VALUE_THRESHOLD) {
      // Check 2FA status
      const { data: user } = await supabase.auth.admin.getUserById(userId);
      
      if (!user?.user?.factors?.totp) {
        throw new PaymentError(
          'HIGH_VALUE_NO_2FA',
          'Two-factor authentication required for high-value transactions'
        );
      }
    }
  }

  static async detectFraudulentActivity(params: {
    userId: string;
    ipAddress: string;
    amount: number;
  }): Promise<void> {
    const { userId, ipAddress, amount } = params;

    // Check for multiple failed attempts
    const { data: recentAttempts } = await supabase
      .from('payment_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'failed')
      .gte('created_at', new Date(Date.now() - this.LOCKOUT_DURATION).toISOString());

    if (recentAttempts && recentAttempts.length >= this.MAX_ATTEMPTS) {
      throw new PaymentError(
        'ACCOUNT_LOCKED',
        'Too many failed payment attempts. Please try again later.'
      );
    }

    // Check for unusual activity
    if (await this.isUnusualActivity(userId, amount)) {
      throw new PaymentError(
        'UNUSUAL_ACTIVITY',
        'Unusual payment activity detected. Please verify your identity.'
      );
    }
  }

  private static async isUnusualActivity(userId: string, amount: number): Promise<boolean> {
    // Get user's average transaction amount
    const { data: transactions } = await supabase
      .from('transactions')
      .select('amount')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (!transactions || transactions.length === 0) return false;

    const avgAmount = transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length;
    const threshold = avgAmount * 3; // Flag if amount is 3x average

    return amount > threshold;
  }
}
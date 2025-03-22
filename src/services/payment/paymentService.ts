import { supabase } from '../../lib/supabase';
import { unisatWallet } from '../wallet/unisatWallet';
import { PaymentDetails, TransactionReceipt, PaymentError } from './types';

export class PaymentService {
  private static readonly MINIMUM_CONFIRMATIONS = 3;
  private static readonly EXCHANGE_RATE_UPDATE_INTERVAL = 60000; // 1 minute
  private static exchangeRateCache: { rate: number; timestamp: number } | null = null;

  static async initializePayment(details: PaymentDetails): Promise<TransactionReceipt> {
    try {
      // Validate network configuration
      const currentNetwork = await unisatWallet.getNetwork();
      if (currentNetwork !== details.network) {
        throw new PaymentError('NETWORK_MISMATCH', 
          `Wallet is on ${currentNetwork} but payment requires ${details.network}`);
      }

      // Get current exchange rate
      const exchangeRate = await this.getBTCExchangeRate();

      // Create transaction record
      const { data: transaction, error } = await supabase
        .from('transactions')
        .insert({
          amount: details.amount,
          recipient_address: details.recipientAddress,
          network: details.network,
          description: details.description,
          metadata: details.metadata,
          exchange_rate: exchangeRate,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Send Bitcoin transaction
      const txHash = await unisatWallet.sendBitcoin(
        details.recipientAddress,
        Math.floor(details.amount * 100000000) // Convert to satoshis
      );

      // Update transaction with hash
      await supabase
        .from('transactions')
        .update({ tx_hash: txHash })
        .eq('id', transaction.id);

      return {
        id: transaction.id,
        txHash,
        amount: details.amount,
        status: 'pending',
        confirmations: 0,
        timestamp: Date.now(),
        network: details.network,
        exchangeRate,
        fiatAmount: {
          amount: details.amount * exchangeRate,
          currency: 'USD'
        }
      };
    } catch (error) {
      const paymentError = new PaymentError(
        'PAYMENT_FAILED',
        error instanceof Error ? error.message : 'Payment processing failed'
      );
      paymentError.details = error;
      throw paymentError;
    }
  }

  static async getTransactionStatus(txHash: string): Promise<TransactionReceipt | null> {
    try {
      const { data: transaction, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('tx_hash', txHash)
        .single();

      if (error) throw error;
      if (!transaction) return null;

      // Get confirmation count from blockchain
      const confirmations = await this.getTransactionConfirmations(txHash);
      const status = this.determineTransactionStatus(confirmations);

      // Update transaction status if needed
      if (status !== transaction.status) {
        await supabase
          .from('transactions')
          .update({ status, confirmations })
          .eq('tx_hash', txHash);
      }

      return {
        id: transaction.id,
        txHash,
        amount: transaction.amount,
        status,
        confirmations,
        timestamp: new Date(transaction.created_at).getTime(),
        network: transaction.network,
        exchangeRate: transaction.exchange_rate,
        fiatAmount: {
          amount: transaction.amount * transaction.exchange_rate,
          currency: 'USD'
        }
      };
    } catch (error) {
      console.error('Error getting transaction status:', error);
      return null;
    }
  }

  private static async getBTCExchangeRate(): Promise<number> {
    // Check cache
    if (this.exchangeRateCache && 
        Date.now() - this.exchangeRateCache.timestamp < this.EXCHANGE_RATE_UPDATE_INTERVAL) {
      return this.exchangeRateCache.rate;
    }

    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const data = await response.json();
      const rate = data.bitcoin.usd;

      // Update cache
      this.exchangeRateCache = {
        rate,
        timestamp: Date.now()
      };

      return rate;
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      // Return last known rate or throw error if no cache
      if (this.exchangeRateCache) return this.exchangeRateCache.rate;
      throw new Error('Failed to get exchange rate');
    }
  }

  private static async getTransactionConfirmations(txHash: string): Promise<number> {
    // Implementation would depend on the Bitcoin node/API service being used
    // This is a placeholder that should be replaced with actual blockchain query
    return 3;
  }

  private static determineTransactionStatus(confirmations: number): 'pending' | 'confirmed' | 'failed' {
    if (confirmations >= this.MINIMUM_CONFIRMATIONS) {
      return 'confirmed';
    }
    return 'pending';
  }
}
import { useState } from 'react';
import { PaymentService } from '../services/payment/paymentService';
import { PaymentDetails, TransactionReceipt } from '../services/payment/types';

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [transaction, setTransaction] = useState<TransactionReceipt | null>(null);

  const processPayment = async (details: PaymentDetails) => {
    setLoading(true);
    setError(null);
    
    try {
      const receipt = await PaymentService.initializePayment(details);
      setTransaction(receipt);
      
      // Start polling for status updates
      const interval = setInterval(async () => {
        const status = await PaymentService.getTransactionStatus(receipt.txHash);
        if (status) {
          setTransaction(status);
          if (status.status === 'confirmed' || status.status === 'failed') {
            clearInterval(interval);
          }
        }
      }, 10000); // Poll every 10 seconds

      return receipt;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Payment failed'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    processPayment,
    loading,
    error,
    transaction
  };
}
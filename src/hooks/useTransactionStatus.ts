import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useTransactionStatus(txHash: string | null) {
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'failed' | null>(null);
  const [confirmations, setConfirmations] = useState<number>(0);

  useEffect(() => {
    if (!txHash) return;

    const checkStatus = async () => {
      try {
        const { data } = await supabase
          .from('trades')
          .select('status, confirmations')
          .eq('tx_hash', txHash)
          .single();

        if (data) {
          setStatus(data.status);
          setConfirmations(data.confirmations);
        }
      } catch (error) {
        console.error('Error checking transaction status:', error);
      }
    };

    const interval = setInterval(checkStatus, 10000); // Check every 10 seconds
    checkStatus(); // Initial check

    return () => clearInterval(interval);
  }, [txHash]);

  return { status, confirmations };
}
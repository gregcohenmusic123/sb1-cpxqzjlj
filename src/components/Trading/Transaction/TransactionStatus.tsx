import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { useTransactionStatus } from '../../../hooks/useTransactionStatus';

interface TransactionStatusProps {
  txHash: string;
}

export default function TransactionStatus({ txHash }: TransactionStatusProps) {
  const { status, confirmations } = useTransactionStatus(txHash);

  if (!status) return null;

  return (
    <div className="flex items-center gap-2 p-3 rounded-lg bg-surface border border-accent/20">
      {status === 'confirmed' ? (
        <>
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-sm text-primary">
            Transaction confirmed ({confirmations} confirmations)
          </span>
        </>
      ) : status === 'pending' ? (
        <>
          <Clock className="w-5 h-5 text-yellow-500 animate-spin" />
          <span className="text-sm text-primary">
            Transaction pending ({confirmations} confirmations)
          </span>
        </>
      ) : (
        <>
          <XCircle className="w-5 h-5 text-red-500" />
          <span className="text-sm text-primary">Transaction failed</span>
        </>
      )}
    </div>
  );
}
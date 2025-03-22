import React from 'react';

interface TransactionConfirmationProps {
  price: number;
  amount: number;
  total: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function TransactionConfirmation({
  price,
  amount,
  total,
  onConfirm,
  onCancel
}: TransactionConfirmationProps) {
  return (
    <div className="p-4 bg-surface border border-accent/20 rounded-lg">
      <h3 className="text-lg text-primary mb-4">Confirm Transaction</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-primary/60">Price:</span>
          <span className="text-primary">{price} BTC</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-primary/60">Amount:</span>
          <span className="text-primary">{amount}</span>
        </div>
        <div className="flex justify-between text-sm font-bold">
          <span className="text-primary/60">Total:</span>
          <span className="text-primary">{total} BTC</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-surface border border-accent/20 text-primary hover:text-accent rounded-lg transition-colors text-sm"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-4 py-2 bg-accent/10 text-accent hover:bg-accent/20 rounded-lg transition-colors text-sm"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
import React from 'react';
import { X } from 'lucide-react';

interface UserOrderProps {
  id: string;
  type: 'buy' | 'sell';
  price: number;
  amount: number;
  onCancel: (id: string) => void;
}

export default function UserOrderRow({ id, type, price, amount, onCancel }: UserOrderProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-surface border border-accent/20 rounded-lg">
      <div>
        <span className={`text-sm ${type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
          {type.toUpperCase()}
        </span>
        <span className="text-sm text-primary ml-2">
          {price} BTC × {amount}
        </span>
      </div>
      <button
        onClick={() => onCancel(id)}
        className="p-1 hover:text-red-500 transition-colors"
        title="Cancel order"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
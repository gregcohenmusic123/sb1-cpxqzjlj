import React, { useState } from 'react';
import { Bitcoin } from 'lucide-react';

interface OrderFormProps {
  type: 'buy' | 'sell';
  onSubmit: (price: string, amount: string) => void;
}

export default function OrderForm({ type, onSubmit }: OrderFormProps) {
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(price, amount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-primary/60 mb-1">Price (BTC)</label>
        <div className="relative">
          <input
            type="number"
            step="0.00000001"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm"
            placeholder="0.00000000"
            required
          />
          <Bitcoin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-primary/60 mb-1">Amount</label>
        <input
          type="number"
          min="1"
          step="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm"
          placeholder="1"
          required
        />
      </div>

      <button
        type="submit"
        className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          type === 'buy'
            ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
            : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
        }`}
      >
        {type === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
      </button>
    </form>
  );
}
```tsx
import React from 'react';

// Mock data - replace with real API data
const asks = Array.from({ length: 5 }, (_, i) => ({
  price: (0.95 + i * 0.01).toFixed(8),
  amount: Math.floor(Math.random() * 5) + 1,
  total: ((0.95 + i * 0.01) * (Math.floor(Math.random() * 5) + 1)).toFixed(8)
}));

const bids = Array.from({ length: 5 }, (_, i) => ({
  price: (0.94 - i * 0.01).toFixed(8),
  amount: Math.floor(Math.random() * 5) + 1,
  total: ((0.94 - i * 0.01) * (Math.floor(Math.random() * 5) + 1)).toFixed(8)
}));

export default function OrderBook() {
  return (
    <div>
      <h3 className="text-lg text-primary mb-4">Order Book</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="grid grid-cols-3 text-sm text-primary/60 mb-2">
            <span>Price (BTC)</span>
            <span>Amount</span>
            <span>Total</span>
          </div>
          <div className="space-y-1">
            {asks.map((ask, i) => (
              <div key={i} className="grid grid-cols-3 text-sm text-red-500">
                <span>{ask.price}</span>
                <span>{ask.amount}</span>
                <span>{ask.total}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-3 text-sm text-primary/60 mb-2">
            <span>Price (BTC)</span>
            <span>Amount</span>
            <span>Total</span>
          </div>
          <div className="space-y-1">
            {bids.map((bid, i) => (
              <div key={i} className="grid grid-cols-3 text-sm text-green-500">
                <span>{bid.price}</span>
                <span>{bid.amount}</span>
                <span>{bid.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```
import React from 'react';

export default function OrderBookHeader() {
  return (
    <div className="grid grid-cols-3 text-[8px] text-primary/60 mb-1">
      <span>Price (BTC)</span>
      <span>Amount</span>
      <span>Total</span>
    </div>
  );
}
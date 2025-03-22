import React from 'react';

interface OrderBookRowProps {
  price: string;
  amount: number;
  total: string;
  type: 'bid' | 'ask';
}

export default function OrderBookRow({ price, amount, total, type }: OrderBookRowProps) {
  return (
    <div className={`grid grid-cols-3 text-[8px] ${
      type === 'bid' ? 'text-green-500' : 'text-red-500'
    } tabular-nums`}>
      <span>{price}</span>
      <span>{amount}</span>
      <span>{total}</span>
    </div>
  );
}
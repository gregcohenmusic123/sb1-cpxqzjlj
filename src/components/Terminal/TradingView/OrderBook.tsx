import React from 'react';

interface Order {
  price: string;
  amount: number;
  total: string;
}

interface OrderBookProps {
  asks: Order[];
  bids: Order[];
}

export default function OrderBook({ asks, bids }: OrderBookProps) {
  return (
    <div>
      <h3 className="text-[10px] font-medium text-primary mb-2">Order Book</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="grid grid-cols-3 text-[8px] text-primary/60 mb-1">
            <div className="flex items-center">Price (BTC)</div>
            <div className="flex items-center">Amount</div>
            <div className="flex items-center">Total</div>
          </div>
          <div className="space-y-[2px]">
            {asks.map((ask, i) => (
              <div key={i} className="grid grid-cols-3 text-[8px] text-red-500 tabular-nums">
                <div className="flex items-center">{ask.price}</div>
                <div className="flex items-center">{ask.amount}</div>
                <div className="flex items-center">{ask.total}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-3 text-[8px] text-primary/60 mb-1">
            <div className="flex items-center">Price (BTC)</div>
            <div className="flex items-center">Amount</div>
            <div className="flex items-center">Total</div>
          </div>
          <div className="space-y-[2px]">
            {bids.map((bid, i) => (
              <div key={i} className="grid grid-cols-3 text-[8px] text-green-500 tabular-nums">
                <div className="flex items-center">{bid.price}</div>
                <div className="flex items-center">{bid.amount}</div>
                <div className="flex items-center">{bid.total}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
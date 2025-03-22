import React from 'react';
import OrderBookHeader from './OrderBookHeader';
import OrderBookRow from './OrderBookRow';

interface Order {
  price: string;
  amount: number;
  total: string;
}

interface OrderBookProps {
  bids: Order[];
  asks: Order[];
}

export default function OrderBook({ bids, asks }: OrderBookProps) {
  return (
    <div>
      <h3 className="text-xs font-medium text-primary mb-2">Order Book</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <OrderBookHeader />
          <div className="space-y-[2px]">
            {asks.map((ask, i) => (
              <OrderBookRow
                key={i}
                {...ask}
                type="ask"
              />
            ))}
          </div>
        </div>
        <div>
          <OrderBookHeader />
          <div className="space-y-[2px]">
            {bids.map((bid, i) => (
              <OrderBookRow
                key={i}
                {...bid}
                type="bid"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
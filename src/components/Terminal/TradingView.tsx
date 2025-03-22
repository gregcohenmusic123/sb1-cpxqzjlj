```tsx
import React, { useState } from 'react';
import OrderForm from './OrderForm';
import PriceChart from './PriceChart';
import OrderBook from './OrderBook';

export default function TradingView() {
  const [selectedTab, setSelectedTab] = useState<'buy' | 'sell'>('buy');

  return (
    <div className="bg-surface rounded-xl border border-accent/20 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-accent/20">
        <div className="lg:col-span-2">
          <PriceChart />
        </div>
        <div className="p-4 space-y-4">
          <div className="flex rounded-lg overflow-hidden border border-accent/20">
            <button
              onClick={() => setSelectedTab('buy')}
              className={`flex-1 px-4 py-2 text-sm ${
                selectedTab === 'buy'
                  ? 'bg-accent/10 text-accent'
                  : 'text-primary hover:text-accent'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setSelectedTab('sell')}
              className={`flex-1 px-4 py-2 text-sm ${
                selectedTab === 'sell'
                  ? 'bg-accent/10 text-accent'
                  : 'text-primary hover:text-accent'
              }`}
            >
              Sell
            </button>
          </div>
          <OrderForm type={selectedTab} />
        </div>
      </div>

      <div className="p-4 border-t border-accent/20">
        <OrderBook />
      </div>
    </div>
  );
}
```
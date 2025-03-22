```tsx
import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

// Mock data - replace with real API data
const collections = [
  { name: 'BAYC', floor: 0.89, change: 5.2 },
  { name: 'Punks', floor: 1.23, change: -2.8 },
  { name: 'Azuki', floor: 0.56, change: 1.5 },
  { name: 'Doodles', floor: 0.34, change: -0.9 },
  { name: 'CloneX', floor: 0.45, change: 3.1 }
];

export default function MarketOverview() {
  return (
    <div className="bg-surface rounded-xl border border-accent/20 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-accent" />
        <h2 className="text-lg text-primary">Market Overview</h2>
      </div>

      <div className="space-y-4">
        {collections.map((collection) => (
          <div
            key={collection.name}
            className="flex items-center justify-between p-3 bg-surface border border-accent/20 rounded-lg"
          >
            <div>
              <h3 className="text-primary">{collection.name}</h3>
              <p className="text-sm text-primary/60">Floor: {collection.floor} BTC</p>
            </div>
            <div
              className={`flex items-center gap-1 ${
                collection.change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {collection.change >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm">{Math.abs(collection.change)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
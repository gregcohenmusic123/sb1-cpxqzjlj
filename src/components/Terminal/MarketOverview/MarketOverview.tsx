import React from 'react';
import { Activity } from 'lucide-react';
import CollectionItem from './CollectionItem';
import { useMarketData } from '../../../hooks/useMarketData';
import { artists } from '../../../data/artists';

export default function MarketOverview() {
  const { collections } = useMarketData();
  
  // Sort collections to prioritize CHUCKIE
  const sortedCollections = [...collections].sort((a, b) => {
    if (a.name === 'CHUCKIE' && b.name !== 'CHUCKIE') return -1;
    if (a.name !== 'CHUCKIE' && b.name === 'CHUCKIE') return 1;
    return 0;
  });

  return (
    <div className="bg-surface rounded-xl border border-accent/20 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-accent" />
        <h2 className="text-lg text-primary">Market Overview</h2>
      </div>

      <div className="space-y-4">
        {sortedCollections.map((collection) => (
          <CollectionItem key={collection.name} collection={collection} />
        ))}
      </div>
    </div>
  );
}
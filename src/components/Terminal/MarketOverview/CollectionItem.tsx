import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Collection } from '../../../types/terminal';

interface CollectionItemProps {
  collection: Collection;
}

export default function CollectionItem({ collection }: CollectionItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-surface border border-accent/20 rounded-lg">
      <div>
        <h3 className="text-primary">{collection.name}</h3>
        <p className="text-sm text-primary/60">Floor: {collection.floor} BTC</p>
      </div>
      <div className={`flex items-center gap-1 ${collection.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {collection.change >= 0 ? (
          <TrendingUp className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )}
        <span className="text-sm">{Math.abs(collection.change)}%</span>
      </div>
    </div>
  );
}
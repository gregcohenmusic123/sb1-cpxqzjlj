import React from 'react';

interface OrderTypeSelectorProps {
  selectedType: 'buy' | 'sell';
  onTypeChange: (type: 'buy' | 'sell') => void;
}

export default function OrderTypeSelector({ selectedType, onTypeChange }: OrderTypeSelectorProps) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-accent/20">
      <button
        onClick={() => onTypeChange('buy')}
        className={`flex-1 px-4 py-2 text-sm transition-colors ${
          selectedType === 'buy'
            ? 'bg-green-500/10 text-green-500'
            : 'text-primary hover:text-accent'
        }`}
      >
        Buy
      </button>
      <button
        onClick={() => onTypeChange('sell')}
        className={`flex-1 px-4 py-2 text-sm transition-colors ${
          selectedType === 'sell'
            ? 'bg-red-500/10 text-red-500'
            : 'text-primary hover:text-accent'
        }`}
      >
        Sell
      </button>
    </div>
  );
}
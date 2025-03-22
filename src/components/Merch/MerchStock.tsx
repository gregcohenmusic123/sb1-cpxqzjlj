import React from 'react';

interface MerchStockProps {
  inStock: number;
}

export default function MerchStock({ inStock }: MerchStockProps) {
  if (inStock >= 20) return null;

  return (
    <span className="absolute top-4 right-4 bg-surface border border-accent/20 text-primary px-3 py-1 rounded-full text-sm">
      Only {inStock} left
    </span>
  );
}
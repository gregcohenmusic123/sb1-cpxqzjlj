import React from 'react';

interface MerchAttributesProps {
  attributes?: {
    size?: string;
    color?: string;
    edition?: string;
    limitedRun?: number;
  };
}

export default function MerchAttributes({ attributes }: MerchAttributesProps) {
  if (!attributes) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(attributes).map(([key, value]) => (
        <span
          key={key}
          className="px-2 py-1 bg-surface border border-accent/20 rounded-full text-sm text-primary/60"
        >
          {key}: {value}
        </span>
      ))}
    </div>
  );
}
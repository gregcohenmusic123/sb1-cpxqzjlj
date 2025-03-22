import React from 'react';
import { Event } from '../../types/events';

interface EventRequirementsProps {
  requirements: Event['requirements'];
}

export default function EventRequirements({ requirements }: EventRequirementsProps) {
  if (!requirements) return null;

  return (
    <div className="bg-surface p-3 rounded-lg text-sm border border-accent/20">
      <p className="text-primary font-medium mb-1">Requirements:</p>
      <ul className="text-primary/60 space-y-1">
        {requirements.minHoldings && (
          <li>• Hold minimum {requirements.minHoldings} Ordinal(s)</li>
        )}
        {requirements.specificOrdinals && (
          <li>• Must own specific Ordinal(s)</li>
        )}
      </ul>
    </div>
  );
}
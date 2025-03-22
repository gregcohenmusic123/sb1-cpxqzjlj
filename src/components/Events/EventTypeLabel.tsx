import React from 'react';
import { Event } from '../../types/events';

interface EventTypeLabelProps {
  type: Event['type'];
}

export default function EventTypeLabel({ type }: EventTypeLabelProps) {
  const getEventTypeLabel = (type: Event['type']) => {
    switch (type) {
      case 'concert': return 'Live Concert';
      case 'meet-greet': return 'Meet & Greet';
      case 'backstage': return 'Backstage Access';
      case 'masterclass': return 'Masterclass';
    }
  };

  return (
    <div className="absolute top-4 right-4 bg-surface border border-accent/20 text-primary px-3 py-1 rounded-full text-sm">
      {getEventTypeLabel(type)}
    </div>
  );
}
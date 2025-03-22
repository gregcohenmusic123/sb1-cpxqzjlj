import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MobilePlayerHeaderProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function MobilePlayerHeader({ isExpanded, onToggle }: MobilePlayerHeaderProps) {
  return (
    <button
      onClick={onToggle}
      className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-surface border border-accent/20 rounded-t-lg px-4 py-1 flex items-center gap-1 text-sm text-primary font-mono"
    >
      {isExpanded ? (
        <>
          <ChevronDown className="w-4 h-4" />
          Hide Player
        </>
      ) : (
        <>
          <ChevronUp className="w-4 h-4" />
          Show Player
        </>
      )}
    </button>
  );
}
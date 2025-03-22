import React from 'react';
import { X } from 'lucide-react';

interface AuthHeaderProps {
  onClose: () => void;
}

export default function AuthHeader({ onClose }: AuthHeaderProps) {
  return (
    <>
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 p-2 bg-surface rounded-full border border-accent/20 hover:text-accent transition-colors"
        aria-label="Close"
      >
        <X className="w-5 h-5 text-primary" />
      </button>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-3">
          <span className="text-3xl md:text-4xl font-mono text-primary">ADV3NT</span>
        </div>
      </div>
    </>
  );
}
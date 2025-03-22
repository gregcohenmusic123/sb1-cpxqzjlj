import React from 'react';
import { SkipBack, SkipForward } from 'lucide-react';

interface SkipButtonProps {
  direction: 'previous' | 'next';
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function SkipButton({ direction, onClick, size = 'md' }: SkipButtonProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const Icon = direction === 'previous' ? SkipBack : SkipForward;

  return (
    <button 
      onClick={onClick}
      className="p-2 hover:bg-accent/10 rounded-full transition-colors"
      aria-label={direction === 'previous' ? 'Previous track' : 'Next track'}
    >
      <Icon className={`${sizeClasses[size]} text-primary`} />
    </button>
  );
}
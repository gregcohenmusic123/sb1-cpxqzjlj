import React from 'react';
import { Play, Pause } from 'lucide-react';

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function PlayButton({ isPlaying, onToggle, size = 'md' }: PlayButtonProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <button 
      onClick={(e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        onToggle();
      }}
      className="p-3 bg-accent/10 hover:bg-accent/20 rounded-full transition-colors"
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      {isPlaying ? (
        <Pause className={`${sizeClasses[size]} text-accent`} />
      ) : (
        <Play className={`${sizeClasses[size]} text-accent`} />
      )}
    </button>
  );
}
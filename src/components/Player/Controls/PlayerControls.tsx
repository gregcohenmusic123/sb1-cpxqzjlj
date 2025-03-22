import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Rewind, FastForward } from 'lucide-react';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onRewind: () => void;
  onForward: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function PlayerControls({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  onRewind,
  onForward,
  size = 'md'
}: PlayerControlsProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const buttonClass = "p-2 hover:bg-accent/10 rounded-full transition-colors";
  const playButtonClass = "p-3 bg-accent/10 hover:bg-accent/20 rounded-full transition-colors";

  return (
    <div className="flex items-center space-x-2">
      <button onClick={onRewind} className={buttonClass} title="Rewind 10 seconds">
        <Rewind className={`${sizeClasses[size]} text-primary`} />
      </button>
      <button onClick={onPrevious} className={buttonClass}>
        <SkipBack className={`${sizeClasses[size]} text-primary`} />
      </button>
      <button onClick={onPlayPause} className={playButtonClass}>
        {isPlaying ? (
          <Pause className={`${sizeClasses[size]} text-accent`} />
        ) : (
          <Play className={`${sizeClasses[size]} text-accent`} />
        )}
      </button>
      <button onClick={onNext} className={buttonClass}>
        <SkipForward className={`${sizeClasses[size]} text-primary`} />
      </button>
      <button onClick={onForward} className={buttonClass} title="Forward 10 seconds">
        <FastForward className={`${sizeClasses[size]} text-primary`} />
      </button>
    </div>
  );
}
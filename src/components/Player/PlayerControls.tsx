import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function PlayerControls({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext
}: PlayerControlsProps) {
  return (
    <div className="flex items-center space-x-4">
      <button 
        onClick={onPrevious} 
        className="p-2 hover:bg-accent/10 rounded-full transition-colors"
      >
        <SkipBack className="w-5 h-5 text-primary" />
      </button>
      <button 
        onClick={onPlayPause} 
        className="p-3 bg-accent/10 hover:bg-accent/20 rounded-full transition-colors"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-accent" />
        ) : (
          <Play className="w-6 h-6 text-accent" />
        )}
      </button>
      <button 
        onClick={onNext} 
        className="p-2 hover:bg-accent/10 rounded-full transition-colors"
      >
        <SkipForward className="w-5 h-5 text-primary" />
      </button>
    </div>
  );
}
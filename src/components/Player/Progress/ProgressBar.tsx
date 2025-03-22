import React from 'react';
import TimeDisplay from './TimeDisplay';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export default function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
  const progress = duration ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek(percent * duration);
  };

  return (
    <div className="space-y-1">
      <div 
        className="h-1 w-full bg-accent/10 rounded-full cursor-pointer"
        onClick={handleSeek}
      >
        <div 
          className="h-1 bg-accent rounded-full transition-all duration-100" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <TimeDisplay currentTime={currentTime} duration={duration} />
    </div>
  );
}
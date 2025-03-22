import React from 'react';
import { formatTime } from '../../../utils/formatTime';

interface TimeDisplayProps {
  currentTime: number;
  duration: number;
}

export default function TimeDisplay({ currentTime, duration }: TimeDisplayProps) {
  return (
    <div className="flex justify-between text-xs text-primary/60">
      <span>{formatTime(currentTime)}</span>
      <span>{formatTime(duration)}</span>
    </div>
  );
}
import React from 'react';

interface TrackTitleProps {
  title: string;
  isCurrentTrack: boolean;
  isPlaying: boolean;
  onClick: () => void;
}

export default function TrackTitle({ title, isCurrentTrack, isPlaying, onClick }: TrackTitleProps) {
  return (
    <h3 
      onClick={onClick}
      className={`text-sm md:text-lg hover:text-accent transition-colors truncate cursor-pointer ${
        isCurrentTrack && isPlaying ? 'text-accent' : 'text-primary'
      }`}
    >
      {title}
    </h3>
  );
}
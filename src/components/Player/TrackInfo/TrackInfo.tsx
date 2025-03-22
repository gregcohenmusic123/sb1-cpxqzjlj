import React from 'react';
import { Track } from '../../../types';

interface TrackInfoProps {
  track: Track;
}

export default function TrackInfo({ track }: TrackInfoProps) {
  return (
    <div className="flex items-center space-x-4">
      <img 
        src={track.coverArt} 
        alt={track.title} 
        className="w-12 h-12 rounded-lg object-cover"
      />
      <div>
        <h3 className="font-mono text-primary">{track.title}</h3>
        <p className="text-sm font-mono text-primary/60">{track.artist}</p>
      </div>
    </div>
  );
}
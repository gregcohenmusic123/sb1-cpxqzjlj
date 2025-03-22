import React from 'react';
import { Track } from '../types';
import TrackCard from './TrackCard';

interface TrackListProps {
  tracks: Track[];
  onPlay: (track: Track) => void;
  onPurchase: (track: Track) => void;
  showArtist?: boolean;
  currentTrack?: Track | null;
  isPlaying?: boolean;
}

export default function TrackList({ 
  tracks, 
  onPlay, 
  onPurchase, 
  showArtist = true,
  currentTrack = null,
  isPlaying = false
}: TrackListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tracks.map(track => (
        <TrackCard
          key={track.id}
          track={track}
          onPlay={() => onPlay(track)}
          onPurchase={() => onPurchase(track)}
          showArtist={showArtist}
          isPlaying={currentTrack?.id === track.id && isPlaying}
        />
      ))}
    </div>
  );
}
import React from 'react';
import PlayButton from '../Player/Controls/PlayButton';

interface TrackCoverProps {
  coverArt: string;
  title: string;
  isCurrentTrack: boolean;
  isPlaying: boolean;
  onPlay: () => void;
}

export default function TrackCover({
  coverArt,
  title,
  isCurrentTrack,
  isPlaying,
  onPlay
}: TrackCoverProps) {
  return (
    <div 
      className="relative cursor-pointer aspect-square md:aspect-[4/3]" 
      onClick={onPlay}
    >
      <img 
        src={coverArt} 
        alt={title} 
        className="w-full h-full object-cover"
      />
      {/* Only show overlay when track is current */}
      {isCurrentTrack && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface/60">
          <div className="transform transition-transform duration-300">
            <PlayButton
              isPlaying={isPlaying}
              onToggle={onPlay}
              size="lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
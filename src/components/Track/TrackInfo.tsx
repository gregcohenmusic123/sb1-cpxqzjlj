import React from 'react';
import TrackTitle from './TrackTitle';
import TrackArtist from './TrackArtist';

interface TrackInfoProps {
  title: string;
  artist: string;
  artistId: string;
  isCurrentTrack: boolean;
  isPlaying: boolean;
  onTitleClick: () => void;
}

export default function TrackInfo({
  title,
  artist,
  artistId,
  isCurrentTrack,
  isPlaying,
  onTitleClick
}: TrackInfoProps) {
  return (
    <div className="space-y-1">
      <TrackTitle
        title={title}
        isCurrentTrack={isCurrentTrack}
        isPlaying={isPlaying}
        onClick={onTitleClick}
      />
      <TrackArtist artist={artist} artistId={artistId} />
    </div>
  );
}
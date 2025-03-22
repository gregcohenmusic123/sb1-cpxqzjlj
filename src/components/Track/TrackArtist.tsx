import React from 'react';
import { Link } from 'react-router-dom';

interface TrackArtistProps {
  artist: string;
  artistId: string;
}

export default function TrackArtist({ artist, artistId }: TrackArtistProps) {
  return (
    <Link 
      to={`/artist/${artistId}`}
      className="text-xs md:text-sm text-primary/60 hover:text-accent transition-colors block truncate"
    >
      {artist}
    </Link>
  );
}
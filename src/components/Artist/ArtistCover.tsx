import React from 'react';

interface ArtistCoverProps {
  coverImage: string;
  artistName: string;
}

export default function ArtistCover({ coverImage, artistName }: ArtistCoverProps) {
  return (
    <div className="h-64 w-full relative">
      <img
        src={coverImage}
        alt={`${artistName} cover`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}
import React from 'react';
import ArtistStats from './ArtistStats';
import ArtistSocialLinks from './ArtistSocialLinks';
import { Artist } from '../../types';

interface ArtistInfoProps {
  artist: Artist;
}

export default function ArtistInfo({ artist }: ArtistInfoProps) {
  return (
    <div className="bg-surface rounded-xl shadow-lg p-6 border border-accent/20">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={artist.profileImage}
          alt={artist.name}
          className="w-32 h-32 rounded-xl object-cover object-top"
        />
        <div className="flex-1">
          <h1 className="text-3xl text-primary">{artist.name}</h1>
          <p className="mt-2 text-primary/60">{artist.bio}</p>
          
          <ArtistStats {...artist.stats} />
          <ArtistSocialLinks socialLinks={artist.socialLinks} />
        </div>
      </div>
    </div>
  );
}
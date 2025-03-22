import React from 'react';
import { motion } from 'framer-motion';
import { artists } from '../../data/artists';
import { Event } from '../../types/events';
import { filterAnimation } from './animations';

interface EventFiltersProps {
  selectedArtist: string;
  selectedType: Event['type'] | '';
  onArtistChange: (artist: string) => void;
  onTypeChange: (type: Event['type'] | '') => void;
}

export default function EventFilters({
  selectedArtist,
  selectedType,
  onArtistChange,
  onTypeChange
}: EventFiltersProps) {
  // Sort artists to prioritize CHUCKIE
  const sortedArtists = [...artists].sort((a, b) => {
    if (a.name === 'CHUCKIE' && b.name !== 'CHUCKIE') return -1;
    if (a.name !== 'CHUCKIE' && b.name === 'CHUCKIE') return 1;
    return 0;
  });

  return (
    <motion.div 
      className="flex gap-4 bg-surface p-4 rounded-lg border border-accent/20"
      {...filterAnimation}
    >
      <select
        value={selectedArtist}
        onChange={(e) => onArtistChange(e.target.value)}
        className="px-4 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm"
      >
        <option value="">All Artists</option>
        {sortedArtists.map(artist => (
          <option key={artist.id} value={artist.name}>
            {artist.name}
          </option>
        ))}
      </select>

      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value as Event['type'] | '')}
        className="px-4 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm"
      >
        <option value="">All Events</option>
        <option value="concert">Concerts</option>
        <option value="meet-greet">Meet & Greets</option>
        <option value="backstage">Backstage Access</option>
        <option value="masterclass">Masterclasses</option>
      </select>
    </motion.div>
  );
}
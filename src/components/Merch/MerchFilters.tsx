import React from 'react';
import { motion } from 'framer-motion';
import { artists } from '../../data/artists';
import { filterAnimation } from './animations';

interface MerchFiltersProps {
  selectedArtist: string;
  selectedType: string;
  onArtistChange: (artist: string) => void;
  onTypeChange: (type: 'vinyl' | 't-shirt' | '') => void;
}

export default function MerchFilters({
  selectedArtist,
  selectedType,
  onArtistChange,
  onTypeChange
}: MerchFiltersProps) {
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
        {artists.map(artist => (
          <option key={artist.id} value={artist.name}>
            {artist.name}
          </option>
        ))}
      </select>

      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value as 'vinyl' | 't-shirt' | '')}
        className="px-4 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm"
      >
        <option value="">All Types</option>
        <option value="vinyl">Vinyl Records</option>
        <option value="t-shirt">T-Shirts</option>
      </select>
    </motion.div>
  );
}
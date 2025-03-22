import React from 'react';
import { motion } from 'framer-motion';
import { tracks } from '../../data/tracks';
import TrackPerformanceCard from './TrackPerformanceCard';
import { gridAnimation } from './animations';

export default function MarketplaceGrid() {
  // Sort tracks to prioritize CHUCKIE
  const sortedTracks = [...tracks].sort((a, b) => {
    if (a.artist === 'CHUCKIE' && b.artist !== 'CHUCKIE') return -1;
    if (a.artist !== 'CHUCKIE' && b.artist === 'CHUCKIE') return 1;
    return 0;
  });

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      variants={gridAnimation}
      initial="hidden"
      animate="show"
    >
      {sortedTracks.map(track => (
        <TrackPerformanceCard key={track.id} track={track} />
      ))}
    </motion.div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { tracks } from '../data/tracks';
import { usePlayer } from '../contexts/PlayerContext';
import TopTrackList from '../components/TopTracks/TopTrackList';

export default function TopTracks() {
  const { playTrack } = usePlayer();

  // Prioritize CHUCKIE tracks, then sort by plays
  const sortedTracks = [...tracks].sort((a, b) => {
    // Put CHUCKIE tracks first
    if (a.artist === 'CHUCKIE' && b.artist !== 'CHUCKIE') return -1;
    if (a.artist !== 'CHUCKIE' && b.artist === 'CHUCKIE') return 1;
    // Then sort by plays
    return b.plays - a.plays;
  });

  const handleLike = (trackId: string) => {
    // TODO: Implement like functionality
    console.log('Like track:', trackId);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-3xl text-primary font-bold">Top Tracks</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <TopTrackList
          tracks={sortedTracks}
          onPlay={playTrack}
          onLike={handleLike}
        />
      </motion.div>
    </motion.div>
  );
}
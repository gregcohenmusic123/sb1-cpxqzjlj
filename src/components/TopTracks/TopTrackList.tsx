import React from 'react';
import { motion } from 'framer-motion';
import { Track } from '../../types';
import TopTrackItem from './TopTrackItem';

interface TopTrackListProps {
  tracks: Track[];
  onPlay: (track: Track) => void;
  onLike: (trackId: string) => void;
}

export default function TopTrackList({ tracks, onPlay, onLike }: TopTrackListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="bg-surface rounded-xl shadow-lg border border-accent/10 divide-y divide-accent/10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {tracks.map((track, index) => (
        <motion.div
          key={track.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <TopTrackItem
            track={track}
            index={index}
            onPlay={() => onPlay(track)}
            onLike={() => onLike(track.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
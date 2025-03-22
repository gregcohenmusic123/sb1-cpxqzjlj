import React from 'react';
import { Track } from '../types';
import { tracks } from '../data/tracks';
import TrackCard from '../components/TrackCard';
import TrendingSection from '../components/TrendingTracks/TrendingSection';
import { usePlayer } from '../contexts/PlayerContext';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { currentTrack, isPlaying } = usePlayer();

  // Prioritize CHUCKIE tracks in latest releases
  const sortedTracks = [...tracks].sort((a, b) => {
    // Put CHUCKIE tracks first
    if (a.artist === 'CHUCKIE' && b.artist !== 'CHUCKIE') return -1;
    if (a.artist !== 'CHUCKIE' && b.artist === 'CHUCKIE') return 1;
    // Then sort by ID for remaining tracks
    return Number(b.id) - Number(a.id);
  });

  const handlePurchase = (track: Track) => {
    alert(`Initiating purchase of "${track.title}" for ${track.price} BTC`);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section>
        <h2 className="text-3xl text-primary font-bold">Latest Releases</h2>
        <div className="mt-6">
        <div className="grid grid-cols-3 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {sortedTracks.map(track => (
            <TrackCard
              key={track.id}
              track={track}
              onPurchase={() => handlePurchase(track)}
              showArtist={true}
              showMobileComments={false}
            />
          ))}
        </div></div>
      </section>
      
      <TrendingSection tracks={tracks} />
    </motion.div>
  );
}
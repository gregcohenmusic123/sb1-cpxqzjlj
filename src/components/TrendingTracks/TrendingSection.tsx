import React from 'react';
import { Link } from 'react-router-dom';
import TrendingTrackItem from './TrendingTrackItem';
import { Track } from '../../types';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

interface TrendingSectionProps {
  tracks: Track[];
}

export default function TrendingSection({ tracks }: TrendingSectionProps) {
  const { playTrack } = useAudioPlayer();

  const sortedTracks = [...tracks].sort((a, b) => {
    // Put CHUCKIE tracks first
    if (a.artist === 'CHUCKIE' && b.artist !== 'CHUCKIE') return -1;
    if (a.artist !== 'CHUCKIE' && b.artist === 'CHUCKIE') return 1;
    // Then sort by plays
    return b.plays - a.plays;
  });

  const handleLike = (trackId: string) => {
    console.log('Like track:', trackId);
  };

  return (
    <section className="hidden md:block bg-surface rounded-xl p-6 border border-accent/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">Trending Right Now</h2>
        <Link
          to="/top-tracks"
          className="text-sm text-primary/60 hover:text-accent transition-colors"
        >
          See all
        </Link>
      </div>

      <div className="space-y-2">
        {sortedTracks.map((track, index) => (
          <TrendingTrackItem
            key={track.id}
            track={track}
            index={index}
            onPlay={() => playTrack(track)}
            onLike={() => handleLike(track.id)}
          />
        ))}
      </div>
    </section>
  );
}
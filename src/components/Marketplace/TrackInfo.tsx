import React from 'react';
import { Link } from 'react-router-dom';
import { Track } from '../../types';
import { findArtistIdByName } from '../../utils/artistUtils';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { Play, Pause } from 'lucide-react';

interface TrackInfoProps {
  track: Track;
}

export default function TrackInfo({ track }: TrackInfoProps) {
  const artistId = findArtistIdByName(track.artist);
  const { currentTrack, isPlaying, playTrack } = useAudioPlayer();
  const isCurrentTrack = currentTrack?.id === track.id;

  return (
    <div className="w-32 h-32 flex-shrink-0 relative group">
      <img 
        src={track.coverArt} 
        alt={track.title}
        className="w-full h-full object-cover"
      />
      <button
        onClick={() => playTrack(track)}
        className="absolute inset-0 flex items-center justify-center bg-surface/60 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {isCurrentTrack && isPlaying ? (
          <Pause className="w-8 h-8 text-accent" />
        ) : (
          <Play className="w-8 h-8 text-accent" />
        )}
      </button>
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-surface/80">
        <button
          onClick={() => playTrack(track)}
          className={`text-xs truncate text-left hover:text-accent transition-colors w-full ${
            isCurrentTrack && isPlaying ? 'text-accent' : 'text-primary'
          }`}
        >
          {track.title}
        </button>
        <Link 
          to={`/artist/${artistId}`}
          className="text-[10px] text-primary/60 hover:text-accent truncate block"
        >
          {track.artist}
        </Link>
      </div>
    </div>
  );
}
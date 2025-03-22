import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';
import { Track } from '../../types';
import { findArtistIdByName } from '../../utils/artistUtils';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { formatTime } from '../../utils/formatTime';

interface TrendingTrackItemProps {
  track: Track;
  index: number;
  onPlay: () => void;
  onLike: () => void;
}

export default function TrendingTrackItem({ track, index, onPlay, onLike }: TrendingTrackItemProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentTrack, isPlaying } = useAudioPlayer();
  const isCurrentTrack = currentTrack?.id === track.id;
  const artistId = findArtistIdByName(track.artist);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="group flex items-center gap-4 p-2 hover:bg-accent/5 rounded-lg transition-colors">
      <span className="w-6 text-center text-primary/30">
        {String(index + 1).padStart(2, '0')}
      </span>
      
      <div className="relative flex-shrink-0">
        <img
          src={track.coverArt}
          alt={track.title}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <button
          onClick={onPlay}
          className="absolute inset-0 flex items-center justify-center bg-surface/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
        >
          {isCurrentTrack && isPlaying ? (
            <Pause className="w-6 h-6 text-accent" />
          ) : (
            <Play className="w-6 h-6 text-accent" />
          )}
        </button>
      </div>

      <div className="flex-grow min-w-0">
        <button
          onClick={onPlay}
          className={`text-sm truncate text-left hover:text-accent transition-colors ${
            isCurrentTrack && isPlaying ? 'text-accent' : 'text-primary'
          }`}
        >
          {track.title}
        </button>
        <Link 
          to={`/artist/${artistId}`}
          className="text-xs text-primary/60 hover:text-accent truncate transition-colors block"
        >
          {track.artist}
        </Link>
      </div>

      <div className="flex items-center gap-4 text-primary/60">
        <div className="flex items-center gap-4 min-w-[160px] justify-end">
          <span className="text-sm w-12 text-right">{formatTime(track.duration)}</span>
          <span className="text-sm w-20 text-right">{formatNumber(track.plays)} plays</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onLike}
            className="p-2 text-primary/60 hover:text-accent transition-colors"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2 text-primary/60 hover:text-accent transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
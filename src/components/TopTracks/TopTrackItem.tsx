import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2, ListPlus, Download, MoreHorizontal } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';
import { Track } from '../../types';
import { findArtistIdByName } from '../../utils/artistUtils';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import PlayButton from '../Player/Controls/PlayButton';

interface TopTrackItemProps {
  track: Track;
  index: number;
  onPlay: () => void;
  onLike: () => void;
}

export default function TopTrackItem({ track, index, onPlay, onLike }: TopTrackItemProps) {
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

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleShare = (platform: string) => {
    switch (platform) {
      case 'Twitter':
        window.open(`https://twitter.com/intent/tweet?text=Check out "${track.title}" by ${track.artist === 'Daytona Starsky' ? 'Daytona Starsky' : track.artist} on ADV3NT!`);
        break;
      case 'Playlist':
        // TODO: Implement playlist functionality
        break;
      case 'Download':
        // TODO: Implement download functionality
        break;
    }
  };

  return (
    <div className="group p-4 bg-surface hover:bg-accent/5 transition-colors">
      <div className="flex items-center gap-3 md:gap-6">
        <span className="w-4 text-xs font-medium text-primary/30 text-right">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative flex-shrink-0" onClick={onPlay}>
          <img
            src={track.coverArt}
            alt={track.title}
            className="w-10 h-10 md:w-16 md:h-16 rounded-lg object-cover"
          />
          {isCurrentTrack && (
            <div className="absolute inset-0 flex items-center justify-center bg-surface/60 rounded-lg">
              <PlayButton
                isPlaying={isPlaying}
                onToggle={onPlay}
                size="sm"
              />
            </div>
          )}
        </div>

        <div className="flex-grow min-w-0 pr-2">
          <h3 
            onClick={onPlay}
            className={`font-medium text-sm md:text-lg truncate leading-tight mb-1 ${
              isCurrentTrack && isPlaying ? 'text-accent' : 'text-primary'
            } hover:text-accent transition-colors cursor-pointer`}
          >
            {track.title}
          </h3>
          <Link 
            to={`/artist/${artistId}`}
            className="text-xs md:text-sm text-primary/60 hover:text-accent truncate transition-colors block"
          >
            {track.artist}
          </Link>
        </div>

        <div className="flex flex-col items-end text-xs md:text-sm text-primary/60 min-w-[80px]">
          <span>{formatDuration(track.duration)}</span>
          <span>{formatNumber(track.plays)} plays</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex flex-col items-end min-w-[80px]">
            <span className="text-accent font-medium flex items-center gap-1">
              {track.price} BTC
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onLike();
              }}
              className="p-2 text-primary/60 hover:text-accent transition-colors"
              title="Like"
            >
              <Heart className="w-5 h-5" />
            </button>
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(!showDropdown);
                }}
                className="p-2 text-primary/60 hover:text-accent transition-colors"
                title="More"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-lg py-1 z-50 border border-accent/10">
                  <button
                    onClick={() => handleShare('Twitter')}
                    className="w-full px-4 py-2 text-left text-sm text-primary hover:text-accent hover:bg-accent/5 flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={() => handleShare('Playlist')}
                    className="w-full px-4 py-2 text-left text-sm text-primary hover:text-accent hover:bg-accent/5 flex items-center gap-2"
                  >
                    <ListPlus className="w-4 h-4" />
                    Add to Playlist
                  </button>
                  <button
                    onClick={() => handleShare('Download')}
                    className="w-full px-4 py-2 text-left text-sm text-primary hover:text-accent hover:bg-accent/5 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
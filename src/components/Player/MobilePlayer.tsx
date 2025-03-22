import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { usePlayer } from '../../contexts/PlayerContext';
import PlayerControls from './Controls/PlayerControls';
import ProgressBar from './Progress/ProgressBar';

export default function MobilePlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { 
    currentTrack, 
    isPlaying, 
    currentTime,
    duration,
    togglePlay, 
    handlePrevious, 
    handleNext,
    forward,
    rewind,
    seek 
  } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="md:hidden fixed bottom-16 left-0 right-0 gradient-surface glass-effect border-t border-accent/20 z-50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 gradient-surface glass-effect border border-accent/20 rounded-t-lg px-4 py-1 flex items-center gap-1 text-sm text-primary"
      >
        {isExpanded ? (
          <>
            <ChevronDown className="w-4 h-4" />
            Hide Player
          </>
        ) : (
          <>
            <ChevronUp className="w-4 h-4" />
            Show Player
          </>
        )}
      </button>

      <div className={`${isExpanded ? 'h-auto' : 'h-16'} transition-all duration-300`}>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={currentTrack.coverArt}
                alt={currentTrack.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <h3 className="text-primary truncate">{currentTrack.title}</h3>
                <p className="text-sm text-primary/60">{currentTrack.artist}</p>
              </div>
            </div>
          </div>

          {isExpanded && (
            <div className="flex flex-col items-center space-y-4">
              <PlayerControls
                isPlaying={isPlaying}
                onPlayPause={togglePlay}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onRewind={rewind}
                onForward={forward}
                size="lg"
              />
              <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSeek={seek}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
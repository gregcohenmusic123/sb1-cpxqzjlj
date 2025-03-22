import React, { useState } from 'react';
import { usePlayer } from '../../../hooks/useAudioPlayer';
import MobilePlayerHeader from './MobilePlayerHeader';
import TrackInfo from '../TrackInfo/TrackInfo';
import PlayerControls from '../Controls/PlayerControls';
import ProgressBar from '../Progress/ProgressBar';

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
    seek 
  } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="md:hidden fixed bottom-16 left-0 right-0 bg-surface border-t border-accent/20 z-50">
      <MobilePlayerHeader 
        isExpanded={isExpanded} 
        onToggle={() => setIsExpanded(!isExpanded)} 
      />

      <div className={`${isExpanded ? 'h-auto' : 'h-16'} transition-all duration-300`}>
        <div className="p-4 space-y-4">
          <TrackInfo track={currentTrack} />

          {isExpanded && (
            <div className="flex flex-col items-center space-y-4">
              <PlayerControls
                isPlaying={isPlaying}
                onPlayPause={togglePlay}
                onPrevious={handlePrevious}
                onNext={handleNext}
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
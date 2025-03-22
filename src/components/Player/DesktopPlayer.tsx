import React from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import PlayerControls from './Controls/PlayerControls';
import ProgressBar from './Progress/ProgressBar';
import VolumeControl from './Volume/VolumeControl';

export default function DesktopPlayer() {
  const { 
    currentTrack, 
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay, 
    handlePrevious, 
    handleNext,
    forward,
    rewind,
    seek,
    setVolume 
  } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="hidden md:block fixed bottom-0 left-0 right-0 bg-surface border-t border-accent/20 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <img 
            src={currentTrack.coverArt} 
            alt={currentTrack.title} 
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-primary">{currentTrack.title}</h3>
            <p className="text-sm text-primary/60">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="flex flex-col items-center flex-1 max-w-xl px-8">
          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={togglePlay}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onRewind={rewind}
            onForward={forward}
          />
          <div className="w-full mt-2">
            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              onSeek={seek}
            />
          </div>
        </div>

        <VolumeControl volume={volume} onVolumeChange={setVolume} />
      </div>
    </div>
  );
}
import React from 'react';
import { usePlayer } from '../../../hooks/useAudioPlayer';
import TrackInfo from '../TrackInfo/TrackInfo';
import PlayerControls from '../Controls/PlayerControls';
import ProgressBar from '../Progress/ProgressBar';
import VolumeControl from '../Volume/VolumeControl';

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
    seek,
    setVolume 
  } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="hidden md:block fixed bottom-0 left-0 right-0 bg-surface border-t border-accent/20 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <TrackInfo track={currentTrack} />

        <div className="flex flex-col items-center flex-1 max-w-xl px-8">
          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={togglePlay}
            onPrevious={handlePrevious}
            onNext={handleNext}
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
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';

interface MobilePlayerControlsProps {
  isPlaying: boolean;
  currentTrack: {
    title: string;
    artist: string;
    coverArt: string;
  };
  audioRef: React.RefObject<HTMLAudioElement>;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function MobilePlayerControls({
  isPlaying,
  currentTrack,
  audioRef,
  onPlayPause,
  onPrevious,
  onNext,
  isExpanded,
  onToggleExpand
}: MobilePlayerControlsProps) {
  return (
    <div>
      <button
        onClick={onToggleExpand}
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-surface border border-accent/20 rounded-t-lg px-4 py-1 flex items-center gap-1 text-sm text-primary font-mono"
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

      <div className={`${isExpanded ? 'h-auto opacity-100' : 'h-16 opacity-100'} transition-all duration-300`}>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={currentTrack.coverArt}
                alt={currentTrack.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-mono text-primary">{currentTrack.title}</h3>
                <p className="text-sm font-mono text-primary/60">{currentTrack.artist}</p>
              </div>
            </div>
          </div>

          {isExpanded && (
            <div className="flex flex-col items-center space-y-4">
              <PlayerControls
                isPlaying={isPlaying}
                onPlayPause={onPlayPause}
                onPrevious={onPrevious}
                onNext={onNext}
              />
              <div className="w-full">
                <ProgressBar audioRef={audioRef} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { useCallback } from 'react';
import { Track } from '../types';
import { useAudioStore } from './useAudioStore';

export function useAudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    volume,
    setTrack,
    play,
    pause,
    toggle,
    setVolume,
    cleanup
  } = useAudioStore();

  const playTrack = useCallback((track: Track) => {
    if (currentTrack?.id === track.id) {
      toggle();
    } else {
      setTrack(track);
      play();
    }
  }, [currentTrack, toggle, setTrack, play]);

  return {
    currentTrack,
    isPlaying,
    volume,
    playTrack,
    togglePlay: toggle,
    setVolume,
    cleanup
  };
}
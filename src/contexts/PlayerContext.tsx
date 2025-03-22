import React, { createContext, useContext, useState, useEffect } from 'react';
import { Track } from '../types';
import { audioPlayer } from '../services/audioPlayer';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  forward: () => void;
  rewind: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioPlayer.getCurrentTime());
    };

    const handleDurationChange = () => {
      setDuration(audioPlayer.getDuration());
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audioPlayer.addEventListener('timeupdate', handleTimeUpdate);
    audioPlayer.addEventListener('durationchange', handleDurationChange);
    audioPlayer.addEventListener('ended', handleEnded);

    return () => {
      audioPlayer.removeEventListener('timeupdate', handleTimeUpdate);
      audioPlayer.removeEventListener('durationchange', handleDurationChange);
      audioPlayer.removeEventListener('ended', handleEnded);
    };
  }, []);

  const playTrack = async (track: Track) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
      return;
    }

    try {
      await audioPlayer.play(track.audioUrl);
      setCurrentTrack(track);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  const togglePlay = async () => {
    if (!currentTrack) return;

    if (isPlaying) {
      audioPlayer.pause();
    } else {
      await audioPlayer.play(currentTrack.audioUrl);
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (time: number) => {
    audioPlayer.seek(time);
    setCurrentTime(time);
  };

  const handleVolume = (value: number) => {
    audioPlayer.setVolume(value);
    setVolume(value);
  };

  const forward = () => {
    audioPlayer.forward();
  };

  const rewind = () => {
    audioPlayer.rewind();
  };

  const handlePrevious = () => {
    // Implement previous track logic
  };

  const handleNext = () => {
    // Implement next track logic
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        playTrack,
        togglePlay,
        seek,
        setVolume: handleVolume,
        handlePrevious,
        handleNext,
        forward,
        rewind
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
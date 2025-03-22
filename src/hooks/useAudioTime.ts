import { useState, useEffect } from 'react';
import { audioPlayer } from '../services/audioPlayer';

export function useAudioTime() {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioPlayer.getCurrentTime());
    };

    const handleDurationChange = () => {
      setDuration(audioPlayer.getDuration());
    };

    const handleLoadedMetadata = () => {
      setDuration(audioPlayer.getDuration());
    };

    audioPlayer.addEventListener('timeupdate', handleTimeUpdate);
    audioPlayer.addEventListener('durationchange', handleDurationChange);
    audioPlayer.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audioPlayer.removeEventListener('timeupdate', handleTimeUpdate);
      audioPlayer.removeEventListener('durationchange', handleDurationChange);
      audioPlayer.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  return { currentTime, duration };
}
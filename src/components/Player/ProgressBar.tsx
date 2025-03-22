import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

export default function ProgressBar({ audioRef }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      setProgress(progress || 0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [audioRef]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  };

  return (
    <div 
      className="h-1 w-full bg-accent/10 rounded-full cursor-pointer"
      onClick={handleSeek}
    >
      <div 
        className="h-1 bg-accent rounded-full transition-all duration-100" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
import React from 'react';
import { Volume2 } from 'lucide-react';
import VolumeSlider from './VolumeSlider';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (value: number) => void;
}

export default function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <Volume2 className="w-5 h-5 text-primary" />
      <VolumeSlider value={volume} onChange={onVolumeChange} />
    </div>
  );
}
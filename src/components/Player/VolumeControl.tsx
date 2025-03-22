import React from 'react';
import { Volume2 } from 'lucide-react';

interface VolumeControlProps {
  onVolumeChange: (value: number) => void;
}

export default function VolumeControl({ onVolumeChange }: VolumeControlProps) {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <Volume2 className="w-5 h-5 text-primary" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue="1"
        className="w-24 accent-accent"
        onChange={(e) => onVolumeChange(Number(e.target.value))}
      />
    </div>
  );
}
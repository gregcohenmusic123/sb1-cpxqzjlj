import React from 'react';

interface VolumeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function VolumeSlider({ value, onChange }: VolumeSliderProps) {
  return (
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={value}
      className="w-24 accent-accent"
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label="Volume"
    />
  );
}
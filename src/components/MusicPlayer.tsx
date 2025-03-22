import React from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import DesktopPlayer from './Player/DesktopPlayer';
import MobilePlayer from './Player/MobilePlayer';

export default function MusicPlayer() {
  const { currentTrack } = usePlayer();

  if (!currentTrack) {
    return null;
  }

  return (
    <>
      <MobilePlayer />
      <DesktopPlayer />
    </>
  );
}
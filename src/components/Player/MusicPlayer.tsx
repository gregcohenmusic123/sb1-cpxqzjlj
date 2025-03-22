import React from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import DesktopPlayer from './DesktopPlayer';
import MobilePlayer from './MobilePlayer';

export default function MusicPlayer() {
  const { currentTrack } = usePlayer();

  if (!currentTrack) {
    return null;
  }

  return (
    <>
      <MobilePlayer />
      <div className="hidden md:block fixed bottom-0 left-0 right-0 gradient-surface glass-effect border-t border-accent/20 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <img 
              src={currentTrack.coverArt} 
              alt={currentTrack.title} 
              className="w-12 h-12 rounded-lg object-cover shadow-lg"
            />
            <DesktopPlayer />
          </div>
        </div>
      </div>
    </>
  );
}
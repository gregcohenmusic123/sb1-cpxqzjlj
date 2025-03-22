import React, { useState } from 'react';
import { Track } from '../types';
import { findArtistIdByName } from '../utils/artistUtils';
import { usePlayer } from '../contexts/PlayerContext';
import TrackInfo from './Track/TrackInfo';
import TrackTitle from './Track/TrackTitle';
import TrackCover from './Track/TrackCover';
import TrackActions from './Track/TrackActions';
import CommentsSection from './Comments/CommentsSection';
import { useModal } from '../contexts/ModalContext';

interface TrackCardProps {
  track: Track;
  onPurchase: () => void;
  showArtist?: boolean;
  showMobileComments?: boolean;
}

export default function TrackCard({ 
  track, 
  onPurchase, 
  showArtist = true,
  showMobileComments = false
}: TrackCardProps) {
  const [showComments, setShowComments] = useState(false);
  const artistId = findArtistIdByName(track.artist);
  const { openPurchaseModal } = useModal();
  const { currentTrack, isPlaying, playTrack } = usePlayer();
  const isCurrentTrack = currentTrack?.id === track.id;

  const handlePlayClick = () => {
    playTrack(track);
  };
  
  // Get artist name display
  const displayArtist = track.artist === 'Daytona Starsky' ? 'Daytona Starsky' : track.artist;

  return (
    <div className="gradient-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-accent/20 hover:border-accent/40">
      <TrackCover
        coverArt={track.coverArt}
        title={track.title}
        isCurrentTrack={isCurrentTrack}
        isPlaying={isPlaying}
        onPlay={handlePlayClick}
      />

      <div className="p-4 md:p-6">
        {showArtist ? (
          <TrackInfo
            title={track.title}
            artist={displayArtist}
            artistId={artistId}
            isCurrentTrack={isCurrentTrack}
            isPlaying={isPlaying}
            onTitleClick={handlePlayClick}
          />
        ) : (
          <TrackTitle
            title={track.title}
            isCurrentTrack={isCurrentTrack}
            isPlaying={isPlaying}
            onClick={handlePlayClick}
          />
        )}

        <TrackActions
          price={track.price}
          showComments={showMobileComments}
          onToggleComments={() => setShowComments(!showComments)}
          onPurchase={() => openPurchaseModal(track.title, track.price, track.artist)}
        />
        
        {showComments && showMobileComments && (
          <div className="mt-4 pt-4 border-t border-accent/20">
            <CommentsSection trackId={track.id} />
          </div>
        )}
      </div>
    </div>
  );
}
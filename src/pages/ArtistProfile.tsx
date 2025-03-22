import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { artists } from '../data/artists';
import { tracks } from '../data/tracks';
import { Track } from '../types';
import ArtistCover from '../components/Artist/ArtistCover';
import ArtistInfo from '../components/Artist/ArtistInfo';
import ArtistTracks from '../components/Artist/ArtistTracks';

export default function ArtistProfile() {
  const { id } = useParams();
  const artist = artists.find(a => a.id === id);
  const artistTracks = tracks.filter(track => track.artist === artist?.name);

  if (!artist) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Artist not found</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Return to home
        </Link>
      </div>
    );
  }

  const handlePurchase = (track: Track) => {
    alert(`Initiating purchase of "${track.title}" for ${track.price} BTC`);
  };

  return (
    <div className="pb-24">
      <ArtistCover coverImage={artist.coverImage} artistName={artist.name} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <ArtistInfo artist={artist} />
        <ArtistTracks tracks={artistTracks} onPurchase={handlePurchase} />
      </div>
    </div>
  );
}
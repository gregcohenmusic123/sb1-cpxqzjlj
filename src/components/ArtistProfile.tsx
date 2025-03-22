import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Twitter, Instagram, Globe, Music, Users, Bitcoin } from 'lucide-react';
import { artists } from '../data/artists';
import { tracks } from '../data/tracks';
import TrackList from './TrackList';
import { Track } from '../types';

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

  const handlePlay = (track: Track) => {
    window.dispatchEvent(new CustomEvent('play-track', { detail: track }));
  };

  const handlePurchase = (track: Track) => {
    alert(`Initiating purchase of "${track.title}" for ${track.price} BTC`);
  };

  return (
    <div className="pb-24">
      {/* Cover Image */}
      <div className="h-64 w-full relative">
        <img
          src={artist.coverImage}
          alt={`${artist.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={artist.profileImage}
              alt={artist.name}
              className="w-32 h-32 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{artist.name}</h1>
              <p className="mt-2 text-gray-600">{artist.bio}</p>
              
              {/* Stats */}
              <div className="mt-4 flex gap-6">
                <div className="flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  <span>{artist.stats.totalTracks} tracks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bitcoin className="w-5 h-5" />
                  <span>{artist.stats.totalSales} sales</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{artist.stats.followers} followers</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-4 flex gap-4">
                {artist.socialLinks.twitter && (
                  <a
                    href={artist.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {artist.socialLinks.instagram && (
                  <a
                    href={artist.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-pink-500"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {artist.socialLinks.website && (
                  <a
                    href={artist.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-green-500"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tracks Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Tracks</h2>
          <TrackList
            tracks={artistTracks}
            onPlay={handlePlay}
            onPurchase={handlePurchase}
          />
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { Track } from '../../types';
import SalesGraph from './SalesGraph';
import { formatNumber } from '../../utils/formatters';
import { findArtistIdByName } from '../../utils/artistUtils';
import { getTrackAnalytics } from '../../data/trackAnalytics';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

interface TrackPerformanceCardProps {
  track: Track;
}

export default function TrackPerformanceCard({ track }: TrackPerformanceCardProps) {
  const artistId = findArtistIdByName(track.artist);
  const analytics = getTrackAnalytics(track);
  const soldPercentage = (analytics.sold / analytics.totalSupply) * 100;
  const { currentTrack, isPlaying, playTrack } = useAudioPlayer();
  const isCurrentTrack = currentTrack?.id === track.id;

  // Determine status color based on availability
  const getStatusColor = () => {
    const percentage = (analytics.available / analytics.totalSupply) * 100;
    if (percentage <= 10) return 'bg-red-500';
    if (percentage <= 25) return 'bg-yellow-500';
    return 'bg-black';
  };

  const handleTitleClick = () => {
    playTrack(track);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="flex">
        {/* Track Image */}
        <div className="w-32 h-32 flex-shrink-0">
          <img 
            src={track.coverArt} 
            alt={track.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <button
                onClick={handleTitleClick}
                className={`font-semibold text-base text-left hover:text-blue-600 transition-colors ${
                  isCurrentTrack && isPlaying ? 'text-blue-600' : ''
                }`}
              >
                {track.title}
              </button>
              <Link 
                to={`/artist/${artistId}`}
                className="text-sm text-gray-500 hover:text-black block"
              >
                {track.artist}
              </Link>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Revenue</p>
              <p className="text-sm font-bold">{analytics.revenue.toFixed(3)} BTC</p>
            </div>
          </div>

          <div className="space-y-2">
            {/* Sales Progress */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>{analytics.sold} sold</span>
                <span>{analytics.available} left</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getStatusColor()} rounded-full transition-all duration-500`}
                  style={{ width: `${soldPercentage}%` }}
                />
              </div>
            </div>

            {/* Sales Graph */}
            <div className="h-16">
              <SalesGraph data={analytics.recentSales} />
            </div>

            {/* Key Metrics */}
            <div className="flex justify-between text-xs pt-1">
              <div>
                <span className="text-gray-500">Supply: </span>
                <span className="font-medium">{formatNumber(analytics.totalSupply)}</span>
              </div>
              <div>
                <span className="text-gray-500">Plays: </span>
                <span className="font-medium">{formatNumber(track.plays)}</span>
              </div>
              <div>
                <span className="text-gray-500">Price: </span>
                <span className="font-medium">{track.price} BTC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Music, Users, Bitcoin } from 'lucide-react';

interface ArtistStatsProps {
  totalTracks: number;
  totalSales: number;
  followers: number;
}

export default function ArtistStats({ totalTracks, totalSales, followers }: ArtistStatsProps) {
  return (
    <div className="mt-4 flex gap-6">
      <div className="flex items-center gap-2 text-primary">
        <Music className="w-5 h-5" />
        <span>{totalTracks} tracks</span>
      </div>
      <div className="flex items-center gap-2 text-primary">
        <Bitcoin className="w-5 h-5" />
        <span>{totalSales} sales</span>
      </div>
      <div className="flex items-center gap-2 text-primary">
        <Users className="w-5 h-5" />
        <span>{followers} followers</span>
      </div>
    </div>
  );
}
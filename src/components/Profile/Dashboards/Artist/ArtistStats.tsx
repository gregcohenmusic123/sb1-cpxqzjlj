import React from 'react';
import { Music, TrendingUp, Users, Bitcoin } from 'lucide-react';
import DashboardCard from '../DashboardCard';

export default function ArtistStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <DashboardCard
        icon={Music}
        label="Total Tracks"
        value="12"
      />
      <DashboardCard
        icon={Bitcoin}
        label="Total Sales"
        value="1.45 BTC"
      />
      <DashboardCard
        icon={TrendingUp}
        label="Monthly Growth"
        value="+24%"
      />
      <DashboardCard
        icon={Users}
        label="Total Followers"
        value="2.3K"
      />
    </div>
  );
}
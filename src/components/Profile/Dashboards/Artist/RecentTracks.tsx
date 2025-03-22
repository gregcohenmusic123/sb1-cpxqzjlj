import React from 'react';
import { Play, BarChart2 } from 'lucide-react';

export default function RecentTracks() {
  const recentTracks = [
    { id: 1, title: 'Cosmic Waves', plays: '1.2K', revenue: '0.15 BTC', trend: '+12%' },
    { id: 2, title: 'Digital Dreams', plays: '856', revenue: '0.08 BTC', trend: '+8%' },
    { id: 3, title: 'Neural Network', plays: '643', revenue: '0.05 BTC', trend: '+15%' }
  ];

  return (
    <div className="bg-surface rounded-lg p-6 border border-accent/20">
      <h3 className="text-lg font-mono text-primary font-bold mb-4">Recent Tracks</h3>
      <div className="space-y-4">
        {recentTracks.map(track => (
          <div key={track.id} className="flex items-center justify-between p-3 bg-surface border border-accent/20 rounded-lg">
            <div className="flex items-center gap-3">
              <button className="p-2 bg-accent/10 rounded-lg">
                <Play className="w-4 h-4 text-accent" />
              </button>
              <div>
                <h4 className="font-mono text-primary font-bold">{track.title}</h4>
                <p className="text-sm font-mono text-primary">{track.plays} plays</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-mono text-primary font-bold">{track.revenue}</p>
                <p className="text-sm font-mono text-accent">{track.trend}</p>
              </div>
              <button className="p-2 hover:bg-accent/10 rounded-lg transition-colors">
                <BarChart2 className="w-4 h-4 text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
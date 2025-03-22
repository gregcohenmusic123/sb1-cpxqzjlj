import React from 'react';
import { motion } from 'framer-motion';
import { Track } from '../../types';
import TrackInfo from './TrackInfo';
import SalesGraph from './SalesGraph';
import TrackMetrics from './TrackMetrics';
import { getTrackAnalytics } from '../../data/trackAnalytics';
import { gridItemAnimation } from './animations';

interface TrackPerformanceCardProps {
  track: Track;
}

export default function TrackPerformanceCard({ track }: TrackPerformanceCardProps) {
  const analytics = getTrackAnalytics(track);
  const soldPercentage = (analytics.sold / analytics.totalSupply) * 100;

  return (
    <motion.div 
      className="bg-surface rounded-xl overflow-hidden border border-accent/20"
      {...gridItemAnimation}
    >
      <div className="flex">
        <TrackInfo track={track} />
        <div className="flex-1 p-4">
          <div className="space-y-2">
            <TrackMetrics 
              analytics={analytics} 
              soldPercentage={soldPercentage} 
            />
            <div className="h-16">
              <SalesGraph data={analytics.recentSales} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
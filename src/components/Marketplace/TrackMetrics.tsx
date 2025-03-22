import React from 'react';
import { formatNumber } from '../../utils/formatters';

interface TrackMetricsProps {
  analytics: {
    sold: number;
    available: number;
    totalSupply: number;
    revenue: number;
  };
  soldPercentage: number;
}

export default function TrackMetrics({ analytics, soldPercentage }: TrackMetricsProps) {
  const getStatusColor = () => {
    const percentage = (analytics.available / analytics.totalSupply) * 100;
    if (percentage <= 10) return 'bg-red-500';
    if (percentage <= 25) return 'bg-yellow-500';
    return 'bg-accent';
  };

  return (
    <>
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-primary/60">{analytics.sold} sold</span>
          <span className="text-primary/60">{analytics.available} left</span>
        </div>
        <div className="h-1.5 bg-surface/20 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getStatusColor()} rounded-full transition-all duration-500`}
            style={{ width: `${soldPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between text-xs pt-1">
        <div>
          <span className="text-primary/60">Supply: </span>
          <span className="text-primary">{formatNumber(analytics.totalSupply)}</span>
        </div>
        <div>
          <span className="text-primary/60">Revenue: </span>
          <span className="text-primary">{analytics.revenue.toFixed(3)} BTC</span>
        </div>
      </div>
    </>
  );
}
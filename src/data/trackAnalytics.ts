import { Track } from '../types';

// Helper function to generate random sales data with a trend
const generateSalesData = (baseValue: number, trend: 'up' | 'down' | 'stable') => {
  const data = [];
  let current = baseValue;
  
  for (let i = 0; i < 5; i++) {
    const variance = Math.random() * 10 - 5;
    if (trend === 'up') current += Math.abs(variance) + 2;
    else if (trend === 'down') current -= Math.abs(variance) + 2;
    else current += variance;
    
    data.push(Math.max(1, Math.round(current)));
  }
  
  return data;
};

export const getTrackAnalytics = (track: Track) => {
  // Use track.id to deterministically generate different analytics for each track
  const trackId = parseInt(track.id);
  
  // Different supply and sales patterns based on track popularity and age
  const patterns = {
    totalSupply: [100, 250, 150, 200, 300, 175, 225, 150, 200][trackId - 1] || 100,
    soldPercentage: [78, 92, 45, 67, 88, 34, 95, 56, 73][trackId - 1] || 50,
    trend: ['up', 'stable', 'down', 'up', 'up', 'down', 'stable', 'up', 'down'][trackId - 1] || 'stable'
  };

  const sold = Math.round(patterns.totalSupply * (patterns.soldPercentage / 100));
  const available = patterns.totalSupply - sold;
  
  // Generate sales data based on trend
  const recentSales = generateSalesData(
    [15, 25, 8, 12, 20, 5, 30, 10, 18][trackId - 1] || 10,
    patterns.trend as 'up' | 'down' | 'stable'
  );

  return {
    totalSupply: patterns.totalSupply,
    sold,
    available,
    recentSales,
    revenue: track.price * sold
  };
};
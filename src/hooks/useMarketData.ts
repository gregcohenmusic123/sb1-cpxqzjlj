import { useState, useEffect } from 'react';
import { Collection } from '../types/terminal';
import { artists } from '../data/artists';

// Generate market data from platform artists
const generateArtistMarketData = (): Collection[] => {
  return artists.map(artist => ({
    name: artist.name,
    floor: Number((Math.random() * 0.5 + 0.1).toFixed(3)),
    change: Number((Math.random() * 20 - 10).toFixed(1))
  }));
};

export function useMarketData() {
  const [collections, setCollections] = useState<Collection[]>(generateArtistMarketData());

  // TODO: Implement real-time market data fetching
  useEffect(() => {
    // Fetch real market data here
  }, []);

  return { collections };
}
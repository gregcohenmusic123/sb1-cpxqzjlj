import React from 'react';
import { useSearch } from '../../contexts/SearchContext';
import TrackCard from '../TrackCard';

export default function SearchResults() {
  const { searchResults, isSearching, searchQuery } = useSearch();

  if (!isSearching) return null;

  return (
    <div className="absolute left-0 right-0 top-full mt-2 bg-surface rounded-lg shadow-lg p-4 max-h-[80vh] overflow-y-auto z-50 border border-accent/20">
      {searchResults.length === 0 ? (
        <p className="text-primary/60 text-center py-4">
          No results found for "{searchQuery}"
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {searchResults.map(track => (
            <TrackCard
              key={track.id}
              track={track}
              onPurchase={() => alert(`Initiating purchase of "${track.title}" for ${track.price} BTC`)}
              showArtist={true}
              showMobileComments={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Track } from '../types';
import { tracks } from '../data/tracks';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Track[];
  isSearching: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const searchResults = tracks.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = useCallback((query: string) => {
    setIsSearching(query.length > 0);
    setSearchQuery(query);
  }, []);

  return (
    <SearchContext.Provider 
      value={{
        searchQuery,
        setSearchQuery: handleSearch,
        searchResults,
        isSearching
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
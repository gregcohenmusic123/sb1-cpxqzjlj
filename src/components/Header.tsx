import React from 'react';
import { Link } from 'react-router-dom';
import { Search, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSearch } from '../contexts/SearchContext';
import SearchResults from './Search/SearchResults';

export default function Header() {
  const { user, signOut } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-accent/20 shadow-lg z-50">
      <div className="flex items-center justify-between h-16">
        <div className="md:w-64 px-4">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://cfbkroydnewghbokycek.supabase.co/storage/v1/object/public/images/ADV3NT%20Logo.png"
              alt="ADV3NT Logo"
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <h1 className="text-xl md:text-2xl font-mono font-normal text-primary">ADV3NT</h1>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-end px-4 md:px-6">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative w-32 md:w-64">
              <Search className="w-4 h-4 md:w-5 md:h-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-primary/50" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-8 pr-3 py-1.5 md:py-2 text-sm bg-background/50 border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-primary placeholder-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchResults />
            </div>

            {user && (
              <>
                <button
                  onClick={handleSignOut}
                  className="md:hidden flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm border border-accent/20"
                >
                  <LogOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSignOut}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors border border-accent/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            )}

            {!user && (
              <Link
                to="/auth"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors border border-accent/20"
              >
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
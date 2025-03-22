import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { navigationItems } from './navigationConfig';
import { useAuth } from '../../contexts/AuthContext';

export default function MobileNavbar() {
  const location = useLocation();
  const { user } = useAuth();

  // Select specific navigation items for mobile
  const mobileNavItems = [
    navigationItems[0], // Home
    navigationItems[1], // Top Tracks
    navigationItems[3], // Marketplace
    navigationItems[4], // Merch
    navigationItems[5], // Events
    navigationItems[7], // Profile/Auth
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 gradient-surface glass-effect border-t border-accent/20 z-50">
      <div className="flex justify-around items-center h-16">
        {mobileNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isAuthItem = item.label === 'Profile';
          const path = isAuthItem && !user ? '/auth' : item.path;
          const label = isAuthItem && !user ? 'Sign In' : item.label;

          return (
            <Link
              key={item.path}
              to={path}
              className="flex flex-col items-center px-2"
            >
              <item.icon
                className={`w-6 h-6 ${
                  isActive ? 'text-accent' : 'text-primary/60'
                }`}
              />
              <span
                className={`text-xs mt-1 whitespace-nowrap ${
                  isActive ? 'text-accent' : 'text-primary/60'
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
import React from 'react';
import { useLocation } from 'react-router-dom';
import SidebarLink from './SidebarLink';
import { navigationItems } from './navigationConfig';
import { useAuth } from '../../contexts/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <nav className="hidden md:flex flex-col w-64 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="p-4 space-y-1">
        {navigationItems.map((item) => (
          <SidebarLink
            key={item.path}
            {...item}
            isActive={location.pathname === item.path}
            isDisabled={item.requiresAuth && !user}
          />
        ))}
      </div>
    </nav>
  );
}
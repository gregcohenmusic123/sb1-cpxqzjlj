import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, initialized } = useAuth();
  const location = useLocation();
  const publicPaths = ['/auth', '/auth/callback'];

  // Don't render anything while checking authentication
  if (!initialized || loading) {
    return null;
  }

  // Allow access to public paths without authentication
  if (publicPaths.includes(location.pathname)) {
    return <>{children}</>;
  }

  // Redirect to auth page if not authenticated and trying to access protected route
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
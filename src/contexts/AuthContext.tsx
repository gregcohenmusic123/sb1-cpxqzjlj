import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const dynamicContext = useDynamicContext();
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false); 

  const initializeAuth = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    } catch (error) {
      console.error('Error initializing auth:', error);
      setUser(null);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event);
      
      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null);
        navigate('/');
      } else if (event === 'USER_DELETED') {
        setUser(null);
        navigate('/auth');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, initializeAuth]);

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    if (isSigningOut) return; // Prevent multiple sign-out attempts
    setIsSigningOut(true);

    const cleanupTasks: (() => Promise<void>)[] = [];
    let success = true;

    try {
      // Step 1: Sign out from Dynamic SDK if connected
      if (dynamicContext.isAuthenticated) {
        try {
          await dynamicContext.handleLogOut();
          cleanupTasks.push(async () => {
            // Clear any remaining Dynamic SDK data
            localStorage.removeItem('dynamic-pk-preferences');
            localStorage.removeItem('dynamic-pk-last-wallet');
            localStorage.removeItem('dynamic-is-authenticated');
            localStorage.removeItem('dynamic-user');
          });
        } catch (error) {
          // Ignore 401 errors during Dynamic SDK logout
          if (error instanceof Error && !error.message.includes('401')) {
            console.error('Error signing out from Dynamic:', error);
            success = false;
          }
        }
      }

      // Step 2: Sign out from Supabase
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        cleanupTasks.push(async () => {
          // Clear any Supabase-related data
          localStorage.removeItem('supabase.auth.token');
          sessionStorage.clear();
        });
      } catch (error) {
        console.error('Error signing out from Supabase:', error);
        success = false;
      }

      // Step 3: Execute cleanup tasks if everything was successful
      if (success) {
        await Promise.all(cleanupTasks.map(task => task()));
        // Clear user state
        setUser(null);
        // Redirect to root URL which will show splash screen
        window.location.href = '/';
      } else {
        toast.error('Error during sign-out. Please try again.');
      }
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('An unexpected error occurred');
      throw error;
    } finally {
      setIsSigningOut(false);
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      initialized,
      signInWithEmail, 
      signUpWithEmail, 
      signOut,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
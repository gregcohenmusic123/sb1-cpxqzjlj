import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { UserProfile, UserType } from '../types/user';
import { useAuth } from '../contexts/AuthContext';

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  async function fetchProfile() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Profile doesn't exist yet, create it
          return await createProfile();
        }
        throw error;
      }
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function createProfile() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ id: user?.id }])
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  async function updateProfile(updates: Partial<UserProfile>): Promise<boolean> {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      // Update local state
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile
  };
}
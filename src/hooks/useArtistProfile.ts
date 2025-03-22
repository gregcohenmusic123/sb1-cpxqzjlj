import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function useArtistProfile() {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const uploadTrack = async (
    title: string,
    price: number,
    audioFile: File,
    coverArt: File
  ) => {
    if (!user) throw new Error('Must be signed in to upload tracks');
    setIsUploading(true);

    try {
      // Upload audio file
      const audioPath = `tracks/${user.id}/${Date.now()}-${audioFile.name}`;
      const { error: audioError } = await supabase.storage
        .from('audio')
        .upload(audioPath, audioFile);
      if (audioError) throw audioError;

      // Upload cover art
      const coverPath = `covers/${user.id}/${Date.now()}-${coverArt.name}`;
      const { error: coverError } = await supabase.storage
        .from('images')
        .upload(coverPath, coverArt);
      if (coverError) throw coverError;

      // Get public URLs
      const audioUrl = supabase.storage.from('audio').getPublicUrl(audioPath).data.publicUrl;
      const coverArtUrl = supabase.storage.from('images').getPublicUrl(coverPath).data.publicUrl;

      // Create track record
      const { error: trackError } = await supabase
        .from('artist_tracks')
        .insert({
          artist_id: user.id,
          title,
          price,
          audio_url: audioUrl,
          cover_art_url: coverArtUrl
        });
      if (trackError) throw trackError;

      return true;
    } catch (error) {
      console.error('Error uploading track:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadTrack,
    isUploading
  };
}
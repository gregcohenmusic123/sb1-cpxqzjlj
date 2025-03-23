import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Track } from "../types";

interface NewTrack {
  id: string;
  title: string;
  artist: string;
  coverArt?: string;
  cover_art_url?: string;
  audioUrl?: string;
  audio_url?: string;
  price: number;
  plays: number;
  duration: number;
  inscription: string;
  created_at: string;
}

export function useNewTracks() {
  const [newTracks, setNewTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchTimestamp, setLastFetchTimestamp] = useState<string>(
    new Date().toISOString(),
  );

  // Initial fetch of tracks
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("tracks")
          .select("*")
          .eq("status", "published")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data) {
          const formattedTracks: Track[] = data.map((track: NewTrack) => ({
            id: track.id,
            title: track.title,
            artist: track.artist,
            coverArt: track.cover_art_url || track.coverArt,
            audioUrl: track.audio_url || track.audioUrl,
            price: track.price,
            plays: track.plays,
            duration: track.duration,
            inscription: track.inscription,
          }));

          setNewTracks(formattedTracks);

          // Update last fetch timestamp
          if (data.length > 0) {
            setLastFetchTimestamp(new Date().toISOString());
          }
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        console.error("Error fetching tracks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const subscription = supabase
      .channel("tracks-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "tracks",
          filter: `status=eq.published AND created_at=gt.${lastFetchTimestamp}`,
        },
        (payload) => {
          const newTrack = payload.new as NewTrack;

          // Format the track to match our Track interface
          const formattedTrack: Track = {
            id: newTrack.id,
            title: newTrack.title,
            artist: newTrack.artist,
            coverArt: newTrack.cover_art_url || newTrack.coverArt,
            audioUrl: newTrack.audio_url || newTrack.audioUrl,
            price: newTrack.price,
            plays: newTrack.plays,
            duration: newTrack.duration,
            inscription: newTrack.inscription,
          };

          // Add the new track to our state
          setNewTracks((prev) => [formattedTrack, ...prev]);

          // Update last fetch timestamp
          setLastFetchTimestamp(new Date().toISOString());
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [lastFetchTimestamp]);

  return { newTracks, loading, error };
}

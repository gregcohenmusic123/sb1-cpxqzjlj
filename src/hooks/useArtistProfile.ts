import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";

export function useArtistProfile() {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const uploadTrack = async (
    title: string,
    price: number,
    audioFile: File,
    coverArt: File,
  ) => {
    if (!user) throw new Error("Must be signed in to upload tracks");
    setIsUploading(true);

    // Track uploaded resources to clean up on failure
    let uploadedAudioPath = null;
    let uploadedCoverPath = null;

    try {
      // Check if file is valid
      if (!audioFile) {
        throw new Error("Audio file is required");
      }

      // Use a simple filename to avoid any path issues
      const fileExtension = audioFile.name.split(".").pop();
      const audioPath = `tracks/${user.id}/${uuidv4()}.${fileExtension || "mp3"}`;

      console.log("Attempting to upload audio file:", {
        path: audioPath,
        size: audioFile.size,
        type: audioFile.type,
      });

      const { error: audioError, data: audioData } = await supabase.storage
        .from("audio")
        .upload(audioPath, audioFile);

      if (audioError) {
        console.error("Audio upload error details:", audioError);
        throw new Error(`Audio upload failed: ${audioError.message}`);
      }

      console.log("Audio upload successful:", audioData);
      uploadedAudioPath = audioPath;

      // Check if file is valid
      if (!coverArt) {
        throw new Error("Cover art is required");
      }

      // Use a simple filename to avoid any path issues
      const imageExtension = coverArt.name.split(".").pop();
      const coverPath = `covers/${user.id}/${uuidv4()}.${imageExtension || "jpg"}`;

      console.log("Attempting to upload cover image:", {
        path: coverPath,
        size: coverArt.size,
        type: coverArt.type,
      });

      const { error: coverError, data: coverData } = await supabase.storage
        .from("images")
        .upload(coverPath, coverArt);

      if (coverError) {
        console.error("Cover upload error details:", coverError);
        throw new Error(`Cover art upload failed: ${coverError.message}`);
      }

      console.log("Cover upload successful:", coverData);
      uploadedCoverPath = coverPath;

      // Get public URLs
      const audioUrl = supabase.storage.from("audio").getPublicUrl(audioPath)
        .data.publicUrl;
      const coverArtUrl = supabase.storage
        .from("images")
        .getPublicUrl(coverPath).data.publicUrl;

      // Create track record in artist_tracks table
      console.log("Inserting record into artist_tracks table:", {
        artist_id: user.id,
        title,
        price,
        audio_url: audioUrl,
        cover_art_url: coverArtUrl,
      });

      const { error: trackError, data: trackData } = await supabase
        .from("artist_tracks")
        .insert({
          artist_id: user.id,
          title,
          price,
          audio_url: audioUrl,
          cover_art_url: coverArtUrl,
        });

      if (trackError) {
        console.error("artist_tracks insert error details:", trackError);
        throw new Error(
          `Failed to save track to artist profile: ${trackError.message}`,
        );
      }

      console.log("artist_tracks insert successful:", trackData);

      // Also insert into the tracks table for the homepage display
      // Fixed: Using correct column names that match the database schema
      const tracksRecord = {
        title,
        artist_id: user.id,
        audio_url: audioUrl, // Changed from audioUrl to audio_url
        cover_art_url: coverArtUrl, // Changed from coverArt to cover_art_url
        price,
        plays: 0,
        duration: 180, // Default duration in seconds
        inscription: `ord1:${Date.now()}`,
        status: "published", // This matches the schema from the migration
      };

      console.log("Inserting record into tracks table:", tracksRecord);

      const { error: publicTrackError, data: publicTrackData } = await supabase
        .from("tracks")
        .insert(tracksRecord);

      if (publicTrackError) {
        console.error("tracks insert error details:", publicTrackError);
        throw new Error(`Failed to publish track: ${publicTrackError.message}`);
      }

      console.log("tracks insert successful:", publicTrackData);

      return true;
    } catch (error) {
      // Enhanced error logging with more details
      console.error("Error uploading track - Details:", {
        error,
        errorMessage: error instanceof Error ? error.message : "Unknown error",
        errorName: error instanceof Error ? error.name : "Unknown type",
        audioPath: uploadedAudioPath,
        coverPath: uploadedCoverPath,
        userId: user.id,
        trackTitle: title,
      });

      // Clean up uploaded files on failure
      try {
        if (uploadedAudioPath) {
          await supabase.storage.from("audio").remove([uploadedAudioPath]);
        }
        if (uploadedCoverPath) {
          await supabase.storage.from("images").remove([uploadedCoverPath]);
        }
      } catch (cleanupError) {
        console.error("Error cleaning up files:", cleanupError);
      }

      // Throw a more specific error with the original error message
      if (error instanceof Error) {
        throw new Error(`Upload failed: ${error.message}`);
      }
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadTrack,
    isUploading,
  };
}

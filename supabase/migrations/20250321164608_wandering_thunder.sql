/*
  # Fix Track Storage and Retrieval

  1. Changes
    - Add missing columns to tracks table
    - Update column constraints
    - Add trigger for metadata validation
    - Add RLS policies for track management
*/

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS validate_track_metadata ON tracks;

-- Add missing columns and update constraints
ALTER TABLE tracks
ALTER COLUMN audio_url SET NOT NULL,
ALTER COLUMN cover_art_url SET NOT NULL,
ALTER COLUMN artist_id SET NOT NULL;

-- Create or replace metadata validation function
CREATE OR REPLACE FUNCTION validate_audio_metadata()
RETURNS trigger AS $$
BEGIN
  -- Skip validation if metadata is null
  IF NEW.metadata IS NULL THEN
    RETURN NEW;
  END IF;

  -- Validate bitrate if present
  IF (NEW.metadata->>'bitrate')::integer < 128 THEN
    RAISE EXCEPTION 'Audio bitrate must be at least 128kbps';
  END IF;

  -- Validate format if present
  IF NEW.metadata->>'format' IS NOT NULL AND 
     NEW.metadata->>'format' NOT IN ('mp3', 'wav', 'flac') THEN
    RAISE EXCEPTION 'Invalid audio format. Supported formats: mp3, wav, flac';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger
CREATE TRIGGER validate_track_metadata
  BEFORE INSERT OR UPDATE ON tracks
  FOR EACH ROW
  EXECUTE FUNCTION validate_audio_metadata();

-- Drop existing policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can view tracks" ON tracks;
  DROP POLICY IF EXISTS "Artists can insert their own tracks" ON tracks;
  DROP POLICY IF EXISTS "Artists can update their own tracks" ON tracks;
END $$;

-- Create new policies
CREATE POLICY "Anyone can view tracks"
  ON tracks FOR SELECT
  USING (true);

CREATE POLICY "Artists can insert their own tracks"
  ON tracks FOR INSERT
  WITH CHECK (
    auth.uid() = artist_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND usertype = 'artist'
    )
  );

CREATE POLICY "Artists can update their own tracks"
  ON tracks FOR UPDATE
  USING (auth.uid() = artist_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS tracks_created_at_idx ON tracks (created_at DESC);
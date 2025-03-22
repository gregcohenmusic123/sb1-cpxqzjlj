/*
  # Track Metadata and CDN Support

  1. New Columns
    - Add metadata columns to tracks table
    - Add CDN-related fields
    - Add audio quality information
  
  2. Functions
    - Add function to validate audio metadata
*/

-- Add new columns to tracks table
ALTER TABLE public.tracks
ADD COLUMN IF NOT EXISTS audio_url text,
ADD COLUMN IF NOT EXISTS cover_art_url text,
ADD COLUMN IF NOT EXISTS duration integer,
ADD COLUMN IF NOT EXISTS format text,
ADD COLUMN IF NOT EXISTS bitrate integer,
ADD COLUMN IF NOT EXISTS cdn_url text,
ADD COLUMN IF NOT EXISTS metadata jsonb;

-- Create function to validate audio metadata
CREATE OR REPLACE FUNCTION validate_audio_metadata()
RETURNS trigger AS $$
BEGIN
  -- Validate bitrate (minimum 320kbps)
  IF NEW.bitrate < 320 THEN
    RAISE EXCEPTION 'Audio bitrate must be at least 320kbps';
  END IF;

  -- Validate format
  IF NEW.format NOT IN ('mp3', 'wav', 'flac') THEN
    RAISE EXCEPTION 'Invalid audio format. Supported formats: mp3, wav, flac';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for metadata validation
CREATE TRIGGER validate_track_metadata
  BEFORE INSERT OR UPDATE ON public.tracks
  FOR EACH ROW
  EXECUTE FUNCTION validate_audio_metadata();
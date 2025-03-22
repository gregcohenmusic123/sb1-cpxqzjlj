/*
  # Add Track Inscription Column

  1. Changes
    - Add inscription column to tracks table
    - Make it nullable since not all tracks will have inscriptions
*/

-- Add inscription column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tracks' AND column_name = 'inscription'
  ) THEN
    ALTER TABLE public.tracks 
    ADD COLUMN inscription text;
  END IF;
END $$;
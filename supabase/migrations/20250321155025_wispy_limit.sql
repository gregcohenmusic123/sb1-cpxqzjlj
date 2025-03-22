/*
  # Add Plays Column to Tracks Table

  1. Changes
    - Add plays column to tracks table
    - Set default value to 0
    - Make it not nullable
*/

-- Add plays column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tracks' AND column_name = 'plays'
  ) THEN
    ALTER TABLE public.tracks 
    ADD COLUMN plays integer NOT NULL DEFAULT 0;
  END IF;
END $$;
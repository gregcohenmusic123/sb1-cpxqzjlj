/*
  # Add Track Status Column

  1. Changes
    - Add status column to tracks table
    - Set default value to 'published'
    - Add check constraint for valid statuses
    - Update existing tracks to published status

  2. Security
    - Maintain existing RLS policies
*/

-- Add status column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tracks' AND column_name = 'status'
  ) THEN
    ALTER TABLE public.tracks 
    ADD COLUMN status text NOT NULL DEFAULT 'published';

    -- Add check constraint
    ALTER TABLE public.tracks
    ADD CONSTRAINT valid_status 
    CHECK (status IN ('draft', 'published', 'archived'));

    -- Update existing tracks to published status
    UPDATE public.tracks
    SET status = 'published'
    WHERE status IS NULL;
  END IF;
END $$;
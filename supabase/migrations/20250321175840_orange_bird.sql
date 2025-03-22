/*
  # Fix Tracks Table Migration

  1. Changes
    - Drop existing policies if they exist
    - Create tracks table if it doesn't exist
    - Add RLS policies with existence checks
    - Add updated_at trigger
    
  2. Security
    - Enable RLS
    - Add policies for:
      - Public read access
      - Artist-only write access
      - Artist-only update access
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Anyone can view tracks" ON public.tracks;
    DROP POLICY IF EXISTS "Artists can insert their own tracks" ON public.tracks;
    DROP POLICY IF EXISTS "Artists can update their own tracks" ON public.tracks;
END $$;

-- Create tracks table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.tracks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    price numeric NOT NULL CHECK (price > 0),
    artist_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    audio_url text NOT NULL,
    cover_art_url text NOT NULL,
    plays integer DEFAULT 0,
    duration integer,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view tracks"
    ON public.tracks
    FOR SELECT
    USING (true);

CREATE POLICY "Artists can insert their own tracks"
    ON public.tracks
    FOR INSERT
    WITH CHECK (
        auth.uid() = artist_id AND
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND usertype = 'artist'
        )
    );

CREATE POLICY "Artists can update their own tracks"
    ON public.tracks
    FOR UPDATE
    USING (auth.uid() = artist_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS tracks_created_at_idx ON tracks (created_at DESC);

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_tracks_updated_at
    BEFORE UPDATE ON tracks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
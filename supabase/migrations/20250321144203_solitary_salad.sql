/*
  # Create Tracks Table

  1. New Tables
    - `tracks`
      - `id` (uuid, primary key)
      - `title` (text, required, 1-100 chars, limited chars)
      - `price` (numeric, required, 8 decimal places)
      - `artist_id` (uuid, references profiles)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for:
      - Anyone can view tracks
      - Artists can insert their own tracks
      - Artists can update their own tracks

  3. Validation
    - Title constraints
    - Price range validation
    - Artist type validation via trigger
*/

-- Create tracks table
CREATE TABLE public.tracks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    price numeric(9,8) NOT NULL,
    artist_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    -- Title constraints
    CONSTRAINT title_length CHECK (char_length(title) BETWEEN 1 AND 100),
    CONSTRAINT title_characters CHECK (title ~ '^[a-zA-Z0-9\s\-'']+$'),

    -- Price constraints
    CONSTRAINT price_range CHECK (price BETWEEN 0.00000001 AND 1.0)
);

-- Create function to validate artist type
CREATE OR REPLACE FUNCTION validate_artist_type()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = NEW.artist_id
        AND usertype = 'artist'
    ) THEN
        RAISE EXCEPTION 'artist_id must reference a profile with usertype = artist';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for artist type validation
CREATE TRIGGER ensure_artist_type
    BEFORE INSERT OR UPDATE ON public.tracks
    FOR EACH ROW
    EXECUTE FUNCTION validate_artist_type();

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
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid()
            AND usertype = 'artist'
        )
    );

CREATE POLICY "Artists can update their own tracks"
    ON public.tracks
    FOR UPDATE
    USING (auth.uid() = artist_id);

-- Create updated_at trigger
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.tracks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
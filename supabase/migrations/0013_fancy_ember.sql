/*
  # Storage Setup

  1. New Storage Buckets
    - images: Public bucket for image files
    - audio: Public bucket for audio files
  
  2. Security Policies
    - Public read access for both buckets
    - Authenticated users can upload to their own folders
    - Users can only modify their own files
*/

-- Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('images', 'images', true),
  ('audio', 'audio', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Images policies
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Images are publicly accessible'
  ) THEN
    DROP POLICY "Images are publicly accessible" ON storage.objects;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Authenticated users can upload images'
  ) THEN
    DROP POLICY "Authenticated users can upload images" ON storage.objects;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Users can update their own images'
  ) THEN
    DROP POLICY "Users can update their own images" ON storage.objects;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Users can delete their own images'
  ) THEN
    DROP POLICY "Users can delete their own images" ON storage.objects;
  END IF;

  -- Audio policies
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Audio files are publicly accessible'
  ) THEN
    DROP POLICY "Audio files are publicly accessible" ON storage.objects;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Authenticated users can upload audio'
  ) THEN
    DROP POLICY "Authenticated users can upload audio" ON storage.objects;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Users can update their own audio files'
  ) THEN
    DROP POLICY "Users can update their own audio files" ON storage.objects;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Users can delete their own audio files'
  ) THEN
    DROP POLICY "Users can delete their own audio files" ON storage.objects;
  END IF;
END $$;

-- Create new policies
-- Images bucket policies
CREATE POLICY "Images are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Audio bucket policies
CREATE POLICY "Audio files are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'audio');

CREATE POLICY "Authenticated users can upload audio"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'audio' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own audio files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'audio' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own audio files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'audio' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
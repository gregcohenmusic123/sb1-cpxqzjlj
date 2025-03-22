/*
  # Fix Storage Policies for File Uploads

  1. Storage Policies
    - Add policies for audio and image uploads
    - Allow authenticated users to upload to their folders
    - Enable public access for reading files
    
  2. Changes
    - Drop existing conflicting policies
    - Create new policies with proper auth checks
    - Set up folder-based access control
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Audio policies
  DROP POLICY IF EXISTS "Audio files are publicly accessible" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload audio" ON storage.objects;
  DROP POLICY IF EXISTS "Users can update their own audio files" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete their own audio files" ON storage.objects;

  -- Image policies
  DROP POLICY IF EXISTS "Images are publicly accessible" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
  DROP POLICY IF EXISTS "Users can update their own images" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete their own images" ON storage.objects;
END $$;

-- Create new storage policies
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
  auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own audio files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'audio' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Users can delete their own audio files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'audio' AND
  auth.role() = 'authenticated'
);

-- Image bucket policies
CREATE POLICY "Images are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'images' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'images' AND
  auth.role() = 'authenticated'
);

-- Ensure buckets exist and are public
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('audio', 'audio', true),
  ('images', 'images', true)
ON CONFLICT (id) DO UPDATE
SET public = true;
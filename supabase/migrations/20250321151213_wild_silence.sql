/*
  # Fix Storage Policies

  1. Changes
    - Update storage policies to allow authenticated users to upload files
    - Simplify policy conditions
    - Ensure public access for audio and images
*/

-- Drop existing policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Audio files are publicly accessible" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload audio" ON storage.objects;
  DROP POLICY IF EXISTS "Images are publicly accessible" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
END $$;

-- Create simplified policies
CREATE POLICY "Audio files are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'audio');

CREATE POLICY "Authenticated users can upload audio"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'audio');

CREATE POLICY "Images are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

-- Ensure buckets exist and are public
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('audio', 'audio', true),
  ('images', 'images', true)
ON CONFLICT (id) DO UPDATE
SET public = true;
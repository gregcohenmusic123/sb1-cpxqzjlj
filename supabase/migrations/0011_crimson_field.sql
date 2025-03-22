/*
  # Add profile pictures storage and policies

  1. Schema Changes
    - Add profile_picture_url column to profiles table
  
  2. Storage
    - Create profiles storage bucket
    - Set up storage policies for profile pictures
    
  3. Security
    - Add policies for uploading, updating, and deleting profile pictures
    - Add public access policy for viewing profile pictures
*/

-- Add profile_picture_url column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'profile_picture_url'
  ) THEN
    ALTER TABLE public.profiles 
    ADD COLUMN profile_picture_url text;
  END IF;
END $$;

-- Create profiles bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('profiles', 'profiles', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Upload policy
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Users can upload their own profile picture'
  ) THEN
    DROP POLICY "Users can upload their own profile picture" ON storage.objects;
  END IF;

  -- Update policy
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Users can update their own profile picture'
  ) THEN
    DROP POLICY "Users can update their own profile picture" ON storage.objects;
  END IF;

  -- Delete policy
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Users can delete their own profile picture'
  ) THEN
    DROP POLICY "Users can delete their own profile picture" ON storage.objects;
  END IF;

  -- Public access policy
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Profile pictures are publicly accessible'
  ) THEN
    DROP POLICY "Profile pictures are publicly accessible" ON storage.objects;
  END IF;
END $$;

-- Create new policies
CREATE POLICY "Users can upload their own profile picture"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profiles' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own profile picture"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profiles' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own profile picture"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'profiles' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Profile pictures are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profiles');
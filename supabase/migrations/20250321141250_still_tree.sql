/*
  # Fix user_type column in profiles table

  1. Changes
    - Rename user_type column to usertype to match TypeScript interface
    - Add check constraint for valid user types
    - Set default value for existing NULL entries

  2. Security
    - No changes to RLS policies needed
*/

DO $$ 
BEGIN
  -- Rename column if it exists as user_type
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'user_type'
  ) THEN
    ALTER TABLE public.profiles 
    RENAME COLUMN user_type TO usertype;
  END IF;

  -- Add column if it doesn't exist at all
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'usertype'
  ) THEN
    ALTER TABLE public.profiles 
    ADD COLUMN usertype text;
  END IF;

  -- Add check constraint for valid user types
  ALTER TABLE public.profiles
  ADD CONSTRAINT valid_usertype 
  CHECK (usertype IN ('artist', 'collector', 'fan', 'content-creator', 'investor'));

END $$;
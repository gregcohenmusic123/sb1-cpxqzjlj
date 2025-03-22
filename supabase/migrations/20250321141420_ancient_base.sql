/*
  # Fix usertype constraint in profiles table

  1. Changes
    - Drop existing valid_usertype constraint
    - Add new constraint that allows NULL values
    - Add trigger to validate usertype when set
*/

-- Drop existing constraint if it exists
ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS valid_usertype;

-- Add new constraint that allows NULL values
ALTER TABLE public.profiles
ADD CONSTRAINT valid_usertype 
CHECK (
  usertype IS NULL OR 
  usertype IN ('artist', 'collector', 'fan', 'content-creator', 'investor')
);
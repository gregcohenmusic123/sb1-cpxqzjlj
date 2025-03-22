/*
  # Add Name Field to Profiles

  1. Changes
    - Add name column to profiles table
    - Make name field required
    - Add length constraint
    - Update existing profiles to have default name

  2. Security
    - Maintain existing RLS policies
*/

-- Add name column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'name'
  ) THEN
    ALTER TABLE public.profiles 
    ADD COLUMN name text;

    -- Set default names for existing profiles
    UPDATE public.profiles
    SET name = 'User ' || id::text
    WHERE name IS NULL;

    -- Make name required after setting defaults
    ALTER TABLE public.profiles
    ALTER COLUMN name SET NOT NULL,
    ADD CONSTRAINT name_length CHECK (char_length(name) <= 50);
  END IF;
END $$;
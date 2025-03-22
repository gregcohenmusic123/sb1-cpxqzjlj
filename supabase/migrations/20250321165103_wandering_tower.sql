/*
  # Enable Realtime for Tracks Table

  1. Changes
    - Enable Realtime for tracks table
    - Add publication for track changes
    - Grant necessary permissions
*/

-- Enable Realtime for tracks table
ALTER PUBLICATION supabase_realtime ADD TABLE tracks;

-- Ensure the table is set up for replication
ALTER TABLE tracks REPLICA IDENTITY FULL;

-- Create a dedicated publication for tracks
CREATE PUBLICATION tracks_pub FOR TABLE tracks;

-- Grant necessary permissions
GRANT SELECT ON tracks TO postgres;
GRANT SELECT ON tracks TO authenticated;
GRANT SELECT ON tracks TO anon;
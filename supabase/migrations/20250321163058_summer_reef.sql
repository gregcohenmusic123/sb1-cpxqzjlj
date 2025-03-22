/*
  # Fix Track Details View

  1. Changes
    - Create view that preserves original column names
    - Include all necessary track fields
    - Add artist name from profiles table
    
  2. Purpose
    - Fix column name conflict error
    - Maintain data consistency
    - Enable proper track listing with artist names
*/

-- Drop existing view if it exists
drop view if exists track_details;

-- Create view with preserved column names
create view track_details as
select 
    t.id,
    t.title,
    t.price,
    t.artist_id,
    t.created_at,
    t.updated_at,
    t.audio_url,
    t.cover_art_url,
    t.duration,
    t.format,
    t.bitrate,
    t.cdn_url,
    t.metadata,
    t.inscription,
    t.plays,
    p.name as artist_name
from tracks t
left join profiles p on t.artist_id = p.id;
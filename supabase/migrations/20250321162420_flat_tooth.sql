/*
  # Add Artist Name View

  1. Create View
    - Joins tracks with profiles to get artist names
    - Makes querying tracks with artist names easier
*/

create or replace view track_details as
select 
  t.*,
  p.name as artist_name
from tracks t
left join profiles p on t.artist_id = p.id;
-- Clear existing comments (if any)
truncate table public.comments;

-- Reset the sequence (if using serial/bigserial)
-- Not needed in this case since we're using UUID

-- Seed initial comments for "Cosmic Waves" (track_id: 1)
insert into public.comments (track_id, author, content, created_at, likes)
values 
  ('1', 'BitcoinMaxi', 'This track is absolutely incredible! The sound design and production quality are next level. 🎵', now() - interval '2 days', 24),
  ('1', 'CryptoArtist', 'Love how the bass hits in the breakdown. Pure fire! 🔥', now() - interval '1 day', 15),
  ('1', 'Web3Producer', 'The atmospheric elements in this track are so well balanced. Definitely worth collecting!', now() - interval '12 hours', 8);

-- Seed initial comments for "Neon Nights" (track_id: 2)
insert into public.comments (track_id, author, content, created_at, likes)
values 
  ('2', 'OrdinalEnthusiast', 'The synth work on this is incredible. Cyber Symphony never disappoints! 🎹', now() - interval '3 days', 31),
  ('2', 'MusicCollector', 'Already added this to my collection. The production value is insane!', now() - interval '2 days', 19),
  ('2', 'BTCMusic', 'This track perfectly captures that cyberpunk vibe. Amazing work! 🌃', now() - interval '1 day', 12);

-- Seed initial comments for "Digital Dreams" (track_id: 3)
insert into public.comments (track_id, author, content, created_at, likes)
values 
  ('3', 'SoundExplorer', 'Meta Collective keeps pushing boundaries. This track is revolutionary! 🚀', now() - interval '4 days', 28),
  ('3', 'NFTMusicFan', 'The way this track progresses is so smooth. Definitely one of their best works!', now() - interval '2 days', 16),
  ('3', 'CryptoBeats', 'Been waiting for this drop! The melody is stuck in my head 🎵', now() - interval '1 day', 11);
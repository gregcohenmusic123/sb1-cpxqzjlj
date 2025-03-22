-- Clear existing comments for these tracks if any
delete from public.comments where track_id in ('6', '9');

-- Add more detailed comments for Metaverse Melody (track_id: 6)
insert into public.comments (track_id, author, content, created_at, likes)
values 
  ('6', 'MetaverseExplorer', 'The spatial audio in this track is mind-blowing! Feels like you''re actually inside the metaverse. 🌐', now() - interval '5 days', 45),
  ('6', 'Web3Producer', 'The way they''ve layered the synthesizers creates such an immersive atmosphere. Pure genius! 🎹', now() - interval '4 days', 38),
  ('6', 'CryptoMusicLover', 'This track perfectly captures the essence of what the metaverse sounds like. Absolutely revolutionary! 🚀', now() - interval '3 days', 29),
  ('6', 'NFTCollector', 'Already added this to my collection. The production value is insane, worth every satoshi! 💎', now() - interval '2 days', 25),
  ('6', 'BTCAudiophile', 'The sound design in this piece is next level. Meta Collective keeps pushing boundaries! 🎵', now() - interval '1 day', 21);

-- Add more detailed comments for Web3 Wonderland (track_id: 9)
insert into public.comments (track_id, author, content, created_at, likes)
values 
  ('9', 'DeFiDreamer', 'This track takes you on a journey through the entire Web3 ecosystem. Masterfully crafted! 🌍', now() - interval '6 days', 52),
  ('9', 'TokenArtist', 'The progression in this track is incredible. Each section represents a different aspect of Web3. Pure art! 🎨', now() - interval '5 days', 43),
  ('9', 'CryptoBeats', 'That breakdown at 2:45 hits harder than a bull market! Absolutely incredible work! 📈', now() - interval '3 days', 37),
  ('9', 'BlockchainBassist', 'The bass design in this track is revolutionary. Sets a new standard for Web3 music! 🎸', now() - interval '2 days', 31),
  ('9', 'MetaCollector', 'Been following Meta Collective since day one, and this might be their best work yet! 🏆', now() - interval '1 day', 28);
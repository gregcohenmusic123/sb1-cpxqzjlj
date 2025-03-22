-- Add comments for new tracks
insert into public.comments (track_id, author, content, created_at, likes)
values 
  -- Comments for Quantum Pulse
  ('4', 'CryptoBeats', 'Digital Dreams does it again! This track is pure energy! ⚡', now() - interval '3 days', 18),
  ('4', 'Web3Musician', 'The production quality is insane. Worth every sat!', now() - interval '2 days', 14),
  
  -- Comments for Blockchain Beats
  ('5', 'BTCMaximalist', 'This beat drops harder than bitcoin in a bull market! 🚀', now() - interval '2 days', 25),
  ('5', 'OrdinalCollector', 'Cyber Symphony never disappoints. Added to my collection!', now() - interval '1 day', 16),
  
  -- Comments for Metaverse Melody
  ('6', 'NFTEnthusiast', 'The way this track builds up is incredible. Pure genius! 🎵', now() - interval '3 days', 22),
  ('6', 'CryptoArtist', 'Meta Collective pushing boundaries again. Love it!', now() - interval '1 day', 19),
  
  -- Comments for Crypto Sunrise
  ('7', 'MusicDAO', 'This track perfectly captures the feeling of a crypto bull run! 📈', now() - interval '2 days', 21),
  ('7', 'SoundCollector', 'The atmospheric elements are so well crafted.', now() - interval '1 day', 13),
  
  -- Comments for Neural Network
  ('8', 'AISoundDesigner', 'The complexity of this track is mind-blowing! 🤖', now() - interval '3 days', 27),
  ('8', 'CryptoProducer', 'Those synth patterns are absolutely incredible.', now() - interval '1 day', 15),
  
  -- Comments for Web3 Wonderland
  ('9', 'MetaverseExplorer', 'This is what the future of music sounds like! 🌐', now() - interval '2 days', 23),
  ('9', 'BTCAudiophile', 'The sound design in this track is next level.', now() - interval '1 day', 17);
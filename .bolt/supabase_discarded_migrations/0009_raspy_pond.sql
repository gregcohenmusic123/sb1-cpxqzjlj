/*
  # Seed Comments Migration V2
  
  1. Purpose
    - Populate comments table with initial data
    - Add 5 comments per track with realistic engagement metrics
  
  2. Changes
    - Clear existing comments
    - Add seed data for all tracks (1-9)
    - Each comment includes author, content, timestamp, and likes
*/

-- Clear existing comments
truncate table public.comments;

-- Seed comments for all tracks
insert into public.comments (track_id, author, content, created_at, likes)
values 
  -- Cosmic Waves (track_id: 1)
  ('1', 'BitcoinMaxi', 'This track is absolutely incredible! The sound design and production quality are next level. 🎵', now() - interval '5 days', 42),
  ('1', 'CryptoArtist', 'Love how the bass hits in the breakdown. Pure fire! 🔥', now() - interval '4 days', 35),
  ('1', 'Web3Producer', 'The atmospheric elements in this track are so well balanced. Digital Dreams at their best!', now() - interval '3 days', 28),
  ('1', 'OrdinalCollector', 'Just inscribed this. The value will only go up from here! 📈', now() - interval '2 days', 21),
  ('1', 'SoundExplorer', 'Each listen reveals new layers. Masterful production! 🎧', now() - interval '1 day', 16),

  -- Neon Nights (track_id: 2)
  ('2', 'CyberAudiophile', 'The synth work on this is mind-blowing. Cyber Symphony pushing boundaries! 🌃', now() - interval '5 days', 38),
  ('2', 'BTCBeats', 'That retro-futuristic vibe is perfectly executed. Worth every sat!', now() - interval '4 days', 31),
  ('2', 'Web3Musician', 'The way they blend classical elements with modern production is genius! 🎻', now() - interval '3 days', 25),
  ('2', 'NFTEnthusiast', 'This track feels like a journey through a neon-lit cityscape. Amazing! 🌆', now() - interval '2 days', 19),
  ('2', 'MusicDAO', 'Setting new standards for electronic music in the Web3 space. 🚀', now() - interval '1 day', 14),

  -- Digital Dreams (track_id: 3)
  ('3', 'CryptoComposer', 'Meta Collective outdid themselves! The production is stellar! 🌟', now() - interval '5 days', 45),
  ('3', 'BTCMusicLover', 'The way this builds up is incredible. Pure genius! 🎹', now() - interval '4 days', 37),
  ('3', 'Web3Artist', 'This is what the future of music sounds like. Absolutely revolutionary! 🚀', now() - interval '3 days', 29),
  ('3', 'SoundInvestor', 'Added to my collection immediately. Timeless piece! 💎', now() - interval '2 days', 23),
  ('3', 'AudioExplorer', 'The sound design here is next level. Each element perfectly placed! 🎧', now() - interval '1 day', 18),

  -- Quantum Pulse (track_id: 4)
  ('4', 'DigitalArtist', 'The energy in this track is unmatched! Digital Dreams keeps innovating! ⚡', now() - interval '5 days', 41),
  ('4', 'CryptoProducer', 'Those quantum-inspired sounds are incredible. Such unique production!', now() - interval '4 days', 33),
  ('4', 'BTCCollector', 'This is going to be a classic in the Ordinals space. 🏆', now() - interval '3 days', 26),
  ('4', 'Web3DJ', 'Perfect for peak time sets. The crowd goes wild every time! 🔥', now() - interval '2 days', 20),
  ('4', 'OrdinalsFan', 'The way this track pulses with energy is hypnotic! 💫', now() - interval '1 day', 15),

  -- Blockchain Beats (track_id: 5)
  ('5', 'CryptoRaver', 'Cyber Symphony captures the essence of blockchain technology perfectly! 🔗', now() - interval '5 days', 39),
  ('5', 'BTCMaximalist', 'This beat drops harder than bitcoin in a bull market! 📈', now() - interval '4 days', 32),
  ('5', 'Web3Producer', 'The technical precision in this track is outstanding! 🎚️', now() - interval '3 days', 27),
  ('5', 'SoundCollector', 'A must-have for any serious music collector in the space. 💎', now() - interval '2 days', 21),
  ('5', 'MetaverseRaver', 'Perfect fusion of tech and music. Revolutionary stuff! 🚀', now() - interval '1 day', 16),

  -- Metaverse Melody (track_id: 6)
  ('6', 'MetaverseExplorer', 'The spatial audio in this track is mind-blowing! 🌐', now() - interval '5 days', 44),
  ('6', 'Web3Producer', 'Those layered synthesizers create such an immersive atmosphere!', now() - interval '4 days', 36),
  ('6', 'CryptoMusicLover', 'This is what the metaverse sounds like. Pure innovation! 🎵', now() - interval '3 days', 29),
  ('6', 'NFTCollector', 'Worth every satoshi! The production value is insane! 💎', now() - interval '2 days', 22),
  ('6', 'BTCAudiophile', 'Meta Collective keeps pushing boundaries! Incredible work! 🏆', now() - interval '1 day', 17),

  -- Crypto Sunrise (track_id: 7)
  ('7', 'DawnPatrol', 'The perfect track to start your day in the metaverse! 🌅', now() - interval '5 days', 37),
  ('7', 'BTCDreamer', 'Those morning vibes with that crypto twist - absolutely beautiful!', now() - interval '4 days', 30),
  ('7', 'Web3Morning', 'The progression in this track feels like watching the sun rise. 🌄', now() - interval '3 days', 24),
  ('7', 'CryptoOptimist', 'This is my new morning motivation track! So uplifting! ⭐', now() - interval '2 days', 19),
  ('7', 'SunriseCollector', 'The atmospheric elements are perfectly crafted. Pure bliss! 🎧', now() - interval '1 day', 15),

  -- Neural Network (track_id: 8)
  ('8', 'AIEnthusiast', 'The complexity of these neural patterns is mind-bending! 🤖', now() - interval '5 days', 40),
  ('8', 'CyberProducer', 'Cyber Symphony pushing the boundaries of electronic music!', now() - interval '4 days', 33),
  ('8', 'TechnoMiner', 'The algorithmic elements in this track are pure genius! 💻', now() - interval '3 days', 27),
  ('8', 'DataArtist', 'Love how they translated neural networks into sound! 🎵', now() - interval '2 days', 21),
  ('8', 'AIComposer', 'This is what the future of AI music should sound like! 🚀', now() - interval '1 day', 16),

  -- Web3 Wonderland (track_id: 9)
  ('9', 'DeFiDreamer', 'A perfect sonic journey through the Web3 ecosystem! 🌍', now() - interval '5 days', 43),
  ('9', 'TokenArtist', 'Each section represents a different aspect of Web3. Brilliant! 🎨', now() - interval '4 days', 35),
  ('9', 'CryptoBeats', 'That breakdown hits harder than a bull market! 📈', now() - interval '3 days', 28),
  ('9', 'BlockchainBassist', 'The bass design is revolutionary! New standards set! 🎸', now() - interval '2 days', 22),
  ('9', 'MetaCollector', 'Meta Collective''s best work yet! Absolutely incredible! 🏆', now() - interval '1 day', 17);
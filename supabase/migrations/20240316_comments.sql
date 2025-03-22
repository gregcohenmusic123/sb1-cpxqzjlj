-- Drop existing table if it exists
drop table if exists public.comments;

-- Create comments table
create table public.comments (
    id uuid default gen_random_uuid() primary key,
    track_id text not null,
    author text not null,
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    likes integer default 0 not null
);

-- Enable Row Level Security (RLS)
alter table public.comments enable row level security;

-- Create policies
create policy "Anyone can read comments"
    on public.comments
    for select
    using (true);

create policy "Authenticated users can insert comments"
    on public.comments
    for insert
    with check (auth.role() = 'authenticated');

-- Create function to increment likes
create or replace function increment_comment_likes(comment_id uuid)
returns void
language plpgsql
security definer
as $$
begin
    update public.comments
    set likes = likes + 1
    where id = comment_id;
end;
$$;

-- Seed initial comments
insert into public.comments (track_id, author, content, created_at, likes)
values 
  -- Digital Dreams comments (track_id: 3)
  ('3', 'CryptoComposer', 'The way this track blends traditional elements with digital soundscapes is pure genius! 🎹', now() - interval '5 days', 42),
  ('3', 'BTCMusicLover', 'Been waiting for this release! The production quality is absolutely stellar. 🌟', now() - interval '4 days', 35),
  ('3', 'Web3Artist', 'This is what the future of music sounds like. Meta Collective never disappoints! 🚀', now() - interval '3 days', 29),
  ('3', 'SoundInvestor', 'Just added this to my collection. The value of this piece will only go up! 📈', now() - interval '2 days', 23),
  ('3', 'AudioExplorer', 'The layering of sounds in this track is incredible. Each listen reveals something new! 🎧', now() - interval '1 day', 18),

  -- Bandana_Chuck comments
  ('6', 'MetaverseExplorer', 'The spatial audio in this track is mind-blowing! Feels like you''re actually inside the metaverse. 🌐', now() - interval '5 days', 45),
  ('6', 'Web3Producer', 'The way CHUCKIE layered the synthesizers creates such an immersive atmosphere. Pure genius! 🎹', now() - interval '4 days', 38),
  ('6', 'CryptoMusicLover', 'This track perfectly captures the essence of what the metaverse sounds like. Absolutely revolutionary! 🚀', now() - interval '3 days', 29),
  ('6', 'NFTCollector', 'Already added this to my collection. The production value is insane, worth every satoshi! 💎', now() - interval '2 days', 25),
  ('6', 'BTCAudiophile', 'The sound design in this piece is next level. CHUCKIE keeps pushing boundaries! 🎵', now() - interval '1 day', 21),

  -- 8BIT_Chuck comments
  ('9', 'DeFiDreamer', 'This track takes you on a journey through the entire Blockchain ecosystem. Masterfully crafted! 🌍', now() - interval '6 days', 52),
  ('9', 'TokenArtist', 'The progression in this track is incredible. Each section represents a different aspect of Web3. Pure art! 🎨', now() - interval '5 days', 43),
  ('9', 'CryptoBeats', 'That breakdown at 2:45 hits harder than a bull market! Absolutely incredible work! 📈', now() - interval '3 days', 37),
  ('9', 'BlockchainBassist', 'The bass design in this track is revolutionary. Sets a new standard for Ordinals music! 🎸', now() - interval '2 days', 31),
  ('9', 'MetaCollector', 'Been following CHUCKIE since day one, and this might be his best work yet! 🏆', now() - interval '1 day', 28);
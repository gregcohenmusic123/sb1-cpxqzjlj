-- Add new columns for artist-specific information
alter table public.profiles add column if not exists artist_name text;
alter table public.profiles add column if not exists artist_genres text[];
alter table public.profiles add column if not exists artist_verified boolean default false;
alter table public.profiles add column if not exists total_tracks integer default 0;
alter table public.profiles add column if not exists total_sales integer default 0;

-- Create artist tracks table
create table if not exists public.artist_tracks (
    id uuid default gen_random_uuid() primary key,
    artist_id uuid references public.profiles(id) on delete cascade,
    title text not null,
    price numeric not null,
    audio_url text not null,
    cover_art_url text not null,
    inscription text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on artist_tracks
alter table public.artist_tracks enable row level security;

-- Create policies for artist_tracks
create policy "Artists can insert their own tracks"
    on public.artist_tracks
    for insert
    with check (auth.uid() = artist_id);

create policy "Artists can update their own tracks"
    on public.artist_tracks
    for update
    using (auth.uid() = artist_id);

create policy "Anyone can view tracks"
    on public.artist_tracks
    for select
    using (true);
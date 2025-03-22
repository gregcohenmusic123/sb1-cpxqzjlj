/*
  # Artist Tracks Table

  1. New Tables
    - `artist_tracks`
      - `id` (uuid, primary key)
      - `artist_id` (uuid, references profiles)
      - `title` (text)
      - `price` (numeric)
      - `audio_url` (text)
      - `cover_art_url` (text)
      - `inscription` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for:
      - Anyone can view tracks
      - Artists can insert their own tracks
      - Artists can update their own tracks
*/

-- Create artist tracks table
create table if not exists public.artist_tracks (
    id uuid default gen_random_uuid() primary key,
    artist_id uuid references public.profiles(id) on delete cascade,
    title text not null,
    price numeric not null,
    audio_url text not null,
    cover_art_url text not null,
    inscription text,
    created_at timestamptz default timezone('utc'::text, now()) not null,
    updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.artist_tracks enable row level security;

-- Create policies
create policy "Anyone can view tracks"
    on public.artist_tracks
    for select
    using (true);

create policy "Artists can insert their own tracks"
    on public.artist_tracks
    for insert
    with check (auth.uid() = artist_id);

create policy "Artists can update their own tracks"
    on public.artist_tracks
    for update
    using (auth.uid() = artist_id);
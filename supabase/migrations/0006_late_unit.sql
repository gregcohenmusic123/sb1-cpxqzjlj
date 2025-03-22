/*
  # Comments Table

  1. New Tables
    - `comments`
      - `id` (uuid, primary key)
      - `track_id` (text)
      - `author` (text) 
      - `content` (text)
      - `created_at` (timestamptz)
      - `likes` (integer)

  2. Security
    - Enable RLS
    - Drop existing policies
    - Add new policies for:
      - Anyone can read comments
      - Authenticated users can insert comments

  3. Functions
    - Add function to increment comment likes
*/

-- Create comments table
create table if not exists public.comments (
    id uuid default gen_random_uuid() primary key,
    track_id text not null,
    author text not null,
    content text not null,
    created_at timestamptz default timezone('utc'::text, now()) not null,
    likes integer default 0 not null
);

-- Enable RLS
alter table public.comments enable row level security;

-- Drop existing policies if they exist
DO $$ BEGIN
    execute format('drop policy if exists "%s" on comments', 'Anyone can read comments');
    execute format('drop policy if exists "%s" on comments', 'Authenticated users can insert comments');
END $$;

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
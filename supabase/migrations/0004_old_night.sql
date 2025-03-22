/*
  # Create Profiles Table

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `user_type` (text)
      - `bio` (text)
      - `website` (text) 
      - `twitter` (text)
      - `instagram` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on profiles table
    - Add policies for:
      - Users can view their own profile
      - Users can update their own profile
      - Users can insert their own profile

  3. Functions
    - Create function to automatically create profile on user signup
*/

-- Create profiles table if it doesn't exist
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    user_type text,
    bio text,
    website text,
    twitter text,
    instagram text,
    created_at timestamptz default timezone('utc'::text, now()) not null,
    updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Drop existing policies if they exist
DO $$ BEGIN
    execute format('drop policy if exists "%s" on profiles', 'Users can view their own profile');
    execute format('drop policy if exists "%s" on profiles', 'Users can update their own profile');
    execute format('drop policy if exists "%s" on profiles', 'Users can insert their own profile');
END $$;

-- Create policies
create policy "Users can view their own profile"
    on public.profiles
    for select
    using (auth.uid() = id);

create policy "Users can update their own profile"
    on public.profiles
    for update
    using (auth.uid() = id);

create policy "Users can insert their own profile"
    on public.profiles
    for insert
    with check (auth.uid() = id);

-- Drop existing function and trigger if they exist
drop function if exists handle_new_user() cascade;

-- Create profile on signup
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.profiles (id)
    values (new.id);
    return new;
end;
$$;

-- Create trigger for new user creation
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure handle_new_user();
/*
  # Escrow Service Tables

  1. New Tables
    - `escrow_transactions`
      - `id` (uuid, primary key)
      - `buyer_address` (text)
      - `seller_address` (text)
      - `amount` (numeric)
      - `price` (numeric)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `escrow_transactions` table
    - Add policies for transaction participants
*/

create table if not exists public.escrow_transactions (
    id uuid default gen_random_uuid() primary key,
    buyer_address text not null,
    seller_address text not null,
    amount numeric not null check (amount > 0),
    price numeric not null check (price > 0),
    status text check (status in ('pending', 'completed', 'failed')) not null default 'pending',
    created_at timestamptz default timezone('utc'::text, now()) not null,
    updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.escrow_transactions enable row level security;

-- Create policies
create policy "Transaction participants can view their transactions"
    on public.escrow_transactions
    for select
    using (
        auth.uid()::text = buyer_address or 
        auth.uid()::text = seller_address
    );

create policy "System can create transactions"
    on public.escrow_transactions
    for insert
    with check (auth.role() = 'service_role');

create policy "System can update transactions"
    on public.escrow_transactions
    for update
    using (auth.role() = 'service_role');
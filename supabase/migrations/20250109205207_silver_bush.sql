/*
  # Payment System Implementation

  1. New Tables
    - `transactions`
      - `id` (uuid, primary key)
      - `tx_hash` (text, unique)
      - `amount` (numeric)
      - `recipient_address` (text)
      - `network` (text)
      - `status` (text)
      - `confirmations` (integer)
      - `exchange_rate` (numeric)
      - `description` (text)
      - `metadata` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `transactions` table
    - Add policies for authenticated users
*/

-- Create transactions table
create table if not exists public.transactions (
    id uuid primary key default gen_random_uuid(),
    tx_hash text unique,
    amount numeric not null check (amount > 0),
    recipient_address text not null,
    network text not null check (network in ('mainnet', 'testnet')),
    status text not null check (status in ('pending', 'confirmed', 'failed')) default 'pending',
    confirmations integer default 0,
    exchange_rate numeric not null,
    description text,
    metadata jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.transactions enable row level security;

-- Create policies
create policy "Users can view their own transactions"
    on public.transactions
    for select
    using (auth.uid()::text = recipient_address);

create policy "Users can create transactions"
    on public.transactions
    for insert
    with check (auth.role() = 'authenticated');

-- Create function to update timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create trigger for updating timestamp
create trigger update_transactions_updated_at
    before update on public.transactions
    for each row
    execute function update_updated_at_column();
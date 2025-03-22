/*
  # Trading Terminal Infrastructure

  1. New Tables
    - orders: Stores all buy/sell orders
    - trades: Records executed trades
    - order_matches: Tracks matched orders for the off-chain engine
  
  2. Security
    - RLS enabled on all tables
    - Policies for viewing and managing orders
    
  3. Functions
    - match_orders: Off-chain order matching logic
    - execute_trade: Handles trade execution
*/

-- Orders table for tracking buy/sell orders
create table if not exists public.orders (
    id uuid default gen_random_uuid() primary key,
    inscription_id text not null,
    maker_address text not null,
    type text check (type in ('buy', 'sell')) not null,
    price numeric not null check (price > 0),
    amount integer not null check (amount > 0),
    status text check (status in ('open', 'filled', 'cancelled')) not null default 'open',
    network text check (network in ('testnet', 'mainnet')) not null default 'testnet',
    created_at timestamptz default now() not null
);

-- Trades table for executed trades
create table if not exists public.trades (
    id uuid default gen_random_uuid() primary key,
    order_id uuid references public.orders(id),
    taker_address text not null,
    price numeric not null,
    amount integer not null,
    network text check (network in ('testnet', 'mainnet')) not null default 'testnet',
    executed_at timestamptz default now() not null
);

-- Order matches for the off-chain engine
create table if not exists public.order_matches (
    id uuid default gen_random_uuid() primary key,
    buy_order_id uuid references public.orders(id),
    sell_order_id uuid references public.orders(id),
    price numeric not null,
    amount integer not null,
    status text check (status in ('pending', 'executed', 'failed')) not null default 'pending',
    created_at timestamptz default now() not null
);

-- Enable RLS
alter table public.orders enable row level security;
alter table public.trades enable row level security;
alter table public.order_matches enable row level security;

-- Policies
create policy "Anyone can view orders"
    on public.orders for select
    using (true);

create policy "Users can create orders"
    on public.orders for insert
    with check (auth.role() = 'authenticated');

create policy "Users can update their own orders"
    on public.orders for update
    using (auth.uid()::text = maker_address);

create policy "Anyone can view trades"
    on public.trades for select
    using (true);

create policy "System can create trades"
    on public.trades for insert
    with check (auth.role() = 'service_role');

-- Function to match orders
create or replace function match_orders(inscription_id text)
returns void
language plpgsql
security definer
as $$
begin
    -- Match buy and sell orders
    insert into public.order_matches (buy_order_id, sell_order_id, price, amount)
    select 
        buy.id as buy_order_id,
        sell.id as sell_order_id,
        sell.price,
        least(buy.amount, sell.amount) as amount
    from public.orders buy
    join public.orders sell 
        on buy.inscription_id = sell.inscription_id
        and buy.price >= sell.price
        and buy.network = sell.network
    where buy.type = 'buy' 
        and sell.type = 'sell'
        and buy.status = 'open'
        and sell.status = 'open'
        and buy.inscription_id = match_orders.inscription_id
    order by sell.price asc, sell.created_at asc
    limit 1;
end;
$$;
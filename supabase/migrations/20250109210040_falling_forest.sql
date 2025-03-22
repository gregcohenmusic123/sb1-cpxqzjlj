/*
  # Payment System Enhancements

  1. New Tables
    - `subscriptions`
      - Manages recurring payment schedules
      - Tracks subscription status and history
    - `payment_notifications`
      - Stores webhook configurations and logs
    - `security_logs`
      - Audit trail for payment-related actions
    - `payment_attempts`
      - Tracks retry attempts for failed payments

  2. Security
    - Enable RLS on all new tables
    - Add policies for secure access control
*/

-- Create subscriptions table
create table if not exists public.subscriptions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade,
    status text not null check (status in ('active', 'paused', 'cancelled')) default 'active',
    billing_cycle text not null check (billing_cycle in ('daily', 'weekly', 'monthly', 'annual')),
    amount numeric not null check (amount > 0),
    next_billing_date timestamptz not null,
    last_payment_date timestamptz,
    retry_count integer default 0,
    metadata jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create payment notifications table
create table if not exists public.payment_notifications (
    id uuid primary key default gen_random_uuid(),
    transaction_id uuid references public.transactions(id),
    type text not null check (type in ('payment_success', 'payment_failed', 'refund', 'subscription_renewal')),
    status text not null check (status in ('pending', 'sent', 'failed')),
    payload jsonb,
    retry_count integer default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create security logs table
create table if not exists public.security_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id),
    action text not null,
    ip_address text,
    user_agent text,
    metadata jsonb,
    created_at timestamptz not null default now()
);

-- Create payment attempts table
create table if not exists public.payment_attempts (
    id uuid primary key default gen_random_uuid(),
    transaction_id uuid references public.transactions(id),
    subscription_id uuid references public.subscriptions(id),
    status text not null check (status in ('pending', 'success', 'failed')),
    error_message text,
    retry_count integer default 0,
    next_retry_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.subscriptions enable row level security;
alter table public.payment_notifications enable row level security;
alter table public.security_logs enable row level security;
alter table public.payment_attempts enable row level security;

-- Create policies
create policy "Users can view their own subscriptions"
    on public.subscriptions
    for select
    using (auth.uid() = user_id);

create policy "Users can manage their own subscriptions"
    on public.subscriptions
    for all
    using (auth.uid() = user_id);

create policy "System can manage payment notifications"
    on public.payment_notifications
    for all
    using (auth.role() = 'service_role');

create policy "Admins can view security logs"
    on public.security_logs
    for select
    using (auth.role() = 'service_role');

create policy "System can manage payment attempts"
    on public.payment_attempts
    for all
    using (auth.role() = 'service_role');
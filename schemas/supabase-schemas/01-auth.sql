-- Supabase Auth & identity
-- Run first in the Supabase SQL editor or via `supabase db push`.
-- Aligns login with auth.users; app tables reference profiles(id) as owner/rep.

-- ---------------------------------------------------------------------------
-- Tenants (workspaces)
-- ---------------------------------------------------------------------------

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Profiles (one row per auth.users — replaces drizzle `users` for Supabase)
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  name text,
  avatar_url text,
  role text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_email_idx on public.profiles (email);

-- ---------------------------------------------------------------------------
-- Tenant membership (multi-tenant access control)
-- ---------------------------------------------------------------------------

create table if not exists public.tenant_members (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  created_at timestamptz not null default now(),
  unique (tenant_id, user_id)
);

create index if not exists tenant_members_user_id_idx on public.tenant_members (user_id);
create index if not exists tenant_members_tenant_id_idx on public.tenant_members (tenant_id);

-- ---------------------------------------------------------------------------
-- Sign-up hook: create profile when a user registers
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'full_name'),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- RLS helpers (used by rls-policies.sql)
-- ---------------------------------------------------------------------------

create or replace function public.user_tenant_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select tenant_id
  from public.tenant_members
  where user_id = auth.uid();
$$;

create or replace function public.is_tenant_member(p_tenant_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.tenant_members
    where tenant_id = p_tenant_id
      and user_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------------
-- Auth table RLS (profiles readable by self; tenants via membership)
-- ---------------------------------------------------------------------------

alter table public.tenants enable row level security;
alter table public.profiles enable row level security;
alter table public.tenant_members enable row level security;

create policy "tenants_select_member"
  on public.tenants for select
  using (id in (select public.user_tenant_ids()));

create policy "profiles_select_self"
  on public.profiles for select
  using (id = auth.uid());

create policy "profiles_update_self"
  on public.profiles for update
  using (id = auth.uid());

create policy "tenant_members_select_same_tenant"
  on public.tenant_members for select
  using (tenant_id in (select public.user_tenant_ids()));

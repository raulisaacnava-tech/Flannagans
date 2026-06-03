create table if not exists public.products (
  id text primary key,
  restaurant_id text not null default 'flanagans',
  name text not null,
  slug text not null unique,
  category text not null,
  price numeric(10,2) not null,
  description text not null,
  long_description text,
  ingredients jsonb,
  allergens jsonb,
  tags jsonb,
  image_url text not null,
  poster_image text,
  video_url text,
  is_available boolean not null default true,
  is_featured boolean not null default false,
  is_campaign boolean not null default false,
  campaign_label text,
  chef_suggestion text,
  suggested_combo text,
  available_units integer,
  display_order integer not null default 50,
  is_profitable boolean not null default false,
  extras jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.promotions (
  id text primary key,
  name text not null,
  label text not null default '',
  description text not null default '',
  discount_type text not null default 'none',
  discount_value numeric(10,2) not null default 0,
  is_active boolean not null default true,
  product_ids jsonb not null default '[]'::jsonb,
  start_date text,
  end_date text,
  color text not null default 'primary',
  show_banner boolean not null default false,
  show_on_home boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.restaurants (
  id text primary key,
  name text not null,
  logo_url text not null,
  brand_colors jsonb not null,
  phone text not null,
  instagram_url text not null,
  whatsapp_number text not null,
  address text not null,
  opening_hours jsonb not null,
  email text,
  welcome_message text,
  homepage_content jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.promotions enable row level security;
alter table public.restaurants enable row level security;

drop policy if exists "public products read" on public.products;
drop policy if exists "public products write" on public.products;
drop policy if exists "public promotions read" on public.promotions;
drop policy if exists "public promotions write" on public.promotions;
drop policy if exists "public restaurants read" on public.restaurants;
drop policy if exists "public restaurants write" on public.restaurants;

create policy "public products read" on public.products for select using (true);
create policy "public products write" on public.products for all using (true) with check (true);

create policy "public promotions read" on public.promotions for select using (true);
create policy "public promotions write" on public.promotions for all using (true) with check (true);

create policy "public restaurants read" on public.restaurants for select using (true);
create policy "public restaurants write" on public.restaurants for all using (true) with check (true);

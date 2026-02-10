-- =========================
-- TABLES
-- =========================

create table if not exists products (
  id             bigserial primary key,
  slug           text unique not null,
  name           text not null,
  tagline        text,
  description    text,
  frame_color    text,
  lens           text,
  fit            text,
  material       text,
  origin         text,
  category       text not null check (category in ('homme','femme','unisex')),
  frame_shape    text not null check (frame_shape in ('carrée','ronde','rectangulaire','aviateur','cat-eye','pantos')),
  color          text not null,
  badge          text check (badge in ('new','bestseller','sale')),
  price_ht       numeric(10,2) not null,
  tva_rate       numeric(5,2) not null default 19,
  currency       text not null default 'TND',
  stock          integer not null default 0,
  main_image_key text not null,      -- clé Cloudflare (ex: products/clarity-01/main.webp)
  created_at     timestamptz not null default now()
);

create table if not exists product_images (
  id          bigserial primary key,
  product_id  bigint not null references products(id) on delete cascade,
  image_key   text not null,         -- clé Cloudflare
  sort_order  int not null default 0,
  role        text check (role in ('main','hover','gallery')) default 'gallery'
);

create table if not exists admin_users (
  id            bigserial primary key,
  username      text unique not null,
  password_hash text not null,
  created_at    timestamptz not null default now()
);


-- =========================
-- INDEX
-- =========================

create index if not exists idx_products_slug         on products (slug);
create index if not exists idx_products_category     on products (category);
create index if not exists idx_products_badge        on products (badge);
create index if not exists idx_products_price_ht     on products (price_ht);
create index if not exists idx_products_created_at   on products (created_at desc);
create index if not exists idx_products_frame_shape  on products (frame_shape);
create index if not exists idx_products_color        on products (color);

create index if not exists idx_product_images_product_id on product_images (product_id);


-- =========================
-- RLS DE BASE

alter table if exists products       enable row level security;
alter table if exists product_images enable row level security;
alter table if exists admin_users    enable row level security;

-- Lecture publique des produits & images (OK pour un catalogue)
create policy "public read products"
  on products
  for select
  using (true);

create policy "public read product_images"
  on product_images
  for select
  using (true);

-- AUCUNE policy de lecture/écriture publique pour admin_users
-- (laissée vide pour l’instant)


-- =========================
-- VUE POUR LISTES PRODUITS
-- =========================

create or replace view view_products_listing as
select
  p.id,
  p.slug,
  p.name,
  p.tagline,
  p.category,
  p.frame_shape,
  p.color,
  p.badge,
  p.currency,
  p.main_image_key,
  p.stock,
  (p.price_ht * (1 + p.tva_rate / 100))::numeric(10,2) as price_ttc,
  ((p.price_ht * (1 + p.tva_rate / 100))::text || ' ' || p.currency) as price_label,
  p.created_at
from products p;

-- =========================
-- RPC : LISTE PRODUITS (FILTRES + TRI + PAGINATION)
-- =========================

create or replace function rpc_list_products(
  p_category     text default 'all',          -- 'homme' | 'femme' | 'unisex' | 'all'
  p_frame_shapes text[] default null,
  p_colors       text[] default null,
  p_price_min    numeric default null,
  p_price_max    numeric default null,
  p_sort         text default 'default',      -- 'price-asc' | 'price-desc' | 'newest' | 'default'
  p_offset       int default 0,
  p_limit        int default 24
)
returns setof view_products_listing
language sql
stable
as $$
  select *
  from view_products_listing
  where
    (p_category is null or p_category = 'all' or category = p_category or category = 'unisex')
    and (p_frame_shapes is null or frame_shape = any(p_frame_shapes))
    and (p_colors is null or color = any(p_colors))
    and (p_price_min is null or price_ttc >= p_price_min)
    and (p_price_max is null or price_ttc <= p_price_max)
  order by
    case when p_sort = 'price-asc'  then price_ttc end asc,
    case when p_sort = 'price-desc' then price_ttc end desc,
    case when p_sort = 'newest'     then id end desc,
    created_at desc
  offset p_offset
  limit p_limit;
$$;


-- =========================
-- RPC : DÉTAIL PRODUIT PAR SLUG
-- =========================

create or replace function rpc_get_product_by_slug(p_slug text)
returns table (
  id             bigint,
  slug           text,
  name           text,
  tagline        text,
  description    text,
  category       text,
  frame_shape    text,
  color          text,
  badge          text,
  currency       text,
  price_ht       numeric,
  tva_rate       numeric,
  price_ttc      numeric,
  price_label    text,
  frame_color    text,
  lens           text,
  fit            text,
  material       text,
  origin         text,
  main_image_key text
)
language sql
stable
as $$
  select
    p.id,
    p.slug,
    p.name,
    p.tagline,
    p.description,
    p.category,
    p.frame_shape,
    p.color,
    p.badge,
    p.currency,
    p.price_ht,
    p.tva_rate,
    (p.price_ht * (1 + p.tva_rate/100))::numeric(10,2) as price_ttc,
    ((p.price_ht * (1 + p.tva_rate/100))::text || ' ' || p.currency) as price_label,
    p.frame_color,
    p.lens,
    p.fit,
    p.material,
    p.origin,
    p.main_image_key
  from products p
  where p.slug = p_slug;
$$;
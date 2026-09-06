create table if not exists public.product_relations (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  related_product_id uuid not null references public.products(id) on delete cascade,
  relation_type text not null check (relation_type in ('compatibility','accessory','alternative','bundle')),
  notes text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint product_relations_distinct check (product_id <> related_product_id),
  constraint product_relations_unique unique (product_id, related_product_id, relation_type)
);

create index if not exists idx_product_relations_product on public.product_relations(product_id, relation_type, sort_order);
create index if not exists idx_product_relations_related on public.product_relations(related_product_id);

create table if not exists public.product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  rating smallint not null check (rating between 1 and 5),
  title text,
  body text,
  status text not null default 'pending' check (status in ('pending','published','rejected')),
  verified_purchase boolean not null default false,
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_product_reviews_product_status on public.product_reviews(product_id, status, created_at desc);
create index if not exists idx_product_reviews_user on public.product_reviews(user_id, created_at desc);

create table if not exists public.import_batches (
  id uuid primary key default gen_random_uuid(),
  source_type text not null check (source_type in ('manual','csv','excel','url','api')),
  source_name text,
  source_url text,
  status text not null default 'pending' check (status in ('pending','processing','review','completed','failed')),
  created_by uuid references auth.users(id) on delete set null,
  stats jsonb not null default '{}'::jsonb,
  error_summary text,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_import_batches_status on public.import_batches(status, created_at desc);

create table if not exists public.import_items (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid not null references public.import_batches(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  duplicate_product_id uuid references public.products(id) on delete set null,
  source_identifier text,
  source_payload jsonb not null default '{}'::jsonb,
  normalized_payload jsonb not null default '{}'::jsonb,
  status text not null default 'extracted' check (status in ('extracted','normalized','duplicate','review','approved','rejected','failed')),
  errors jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_import_items_batch_status on public.import_items(batch_id, status);
create index if not exists idx_import_items_product on public.import_items(product_id);

create table if not exists public.shipping_methods (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  provider text,
  method_type text not null default 'standard' check (method_type in ('standard','express','courier','pickup','post','tipax','custom')),
  fee_amount numeric not null default 0 check (fee_amount >= 0),
  free_over_amount numeric check (free_over_amount is null or free_over_amount >= 0),
  config jsonb not null default '{}'::jsonb,
  enabled boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_shipping_methods_enabled on public.shipping_methods(enabled, sort_order);

create table if not exists public.promotions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text unique,
  discount_type text not null check (discount_type in ('percent','fixed')),
  discount_value numeric not null check (discount_value >= 0),
  min_order_amount numeric check (min_order_amount is null or min_order_amount >= 0),
  starts_at timestamptz,
  ends_at timestamptz,
  usage_limit integer check (usage_limit is null or usage_limit > 0),
  enabled boolean not null default true,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint promotions_date_range check (ends_at is null or starts_at is null or ends_at > starts_at)
);

create index if not exists idx_promotions_active_window on public.promotions(enabled, starts_at, ends_at);

create table if not exists public.seo_redirects (
  id uuid primary key default gen_random_uuid(),
  from_path text not null unique,
  to_path text not null,
  status_code smallint not null default 301 check (status_code in (301,302,307,308)),
  enabled boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint seo_redirects_paths check (from_path <> to_path)
);

create index if not exists idx_seo_redirects_enabled on public.seo_redirects(enabled, from_path);

create table if not exists public.health_checks (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  category text not null,
  status text not null default 'not_started' check (status in ('not_started','warning','ready','error')),
  details jsonb not null default '{}'::jsonb,
  last_checked_at timestamptz,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_health_checks_category_status on public.health_checks(category, status);

alter table public.product_relations enable row level security;
alter table public.product_reviews enable row level security;
alter table public.import_batches enable row level security;
alter table public.import_items enable row level security;
alter table public.shipping_methods enable row level security;
alter table public.promotions enable row level security;
alter table public.seo_redirects enable row level security;
alter table public.health_checks enable row level security;

create policy product_relations_public_read on public.product_relations
for select to anon, authenticated
using (
  exists (select 1 from public.products p where p.id = product_id and (p.status = 'published'::product_status or is_admin()))
  and exists (select 1 from public.products rp where rp.id = related_product_id and (rp.status = 'published'::product_status or is_admin()))
);
create policy product_relations_admin_write on public.product_relations
for all to authenticated using (is_admin()) with check (is_admin());

create policy product_reviews_public_read on public.product_reviews
for select to anon, authenticated using (status = 'published' or is_admin() or user_id = auth.uid());
create policy product_reviews_customer_insert on public.product_reviews
for insert to authenticated with check (user_id = auth.uid() and status = 'pending');
create policy product_reviews_customer_update_pending on public.product_reviews
for update to authenticated using (user_id = auth.uid() and status = 'pending') with check (user_id = auth.uid() and status = 'pending');
create policy product_reviews_admin_write on public.product_reviews
for all to authenticated using (is_admin()) with check (is_admin());

create policy import_batches_admin_only on public.import_batches
for all to authenticated using (is_admin()) with check (is_admin());
create policy import_items_admin_only on public.import_items
for all to authenticated using (is_admin()) with check (is_admin());

create policy shipping_methods_public_read on public.shipping_methods
for select to anon, authenticated using (enabled or is_admin());
create policy shipping_methods_admin_write on public.shipping_methods
for all to authenticated using (is_admin()) with check (is_admin());

create policy promotions_public_read on public.promotions
for select to anon, authenticated
using (
  is_admin() or (
    enabled
    and (starts_at is null or starts_at <= now())
    and (ends_at is null or ends_at > now())
  )
);
create policy promotions_admin_write on public.promotions
for all to authenticated using (is_admin()) with check (is_admin());

create policy seo_redirects_admin_only on public.seo_redirects
for all to authenticated using (is_admin()) with check (is_admin());
create policy health_checks_admin_only on public.health_checks
for all to authenticated using (is_admin()) with check (is_admin());

grant select on public.product_relations, public.product_reviews, public.shipping_methods, public.promotions to anon;
grant select, insert, update, delete on public.product_relations, public.product_reviews, public.import_batches, public.import_items, public.shipping_methods, public.promotions, public.seo_redirects, public.health_checks to authenticated;

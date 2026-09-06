create index if not exists idx_health_checks_updated_by on public.health_checks(updated_by);
create index if not exists idx_import_batches_created_by on public.import_batches(created_by);
create index if not exists idx_import_items_duplicate_product on public.import_items(duplicate_product_id);
create index if not exists idx_seo_redirects_created_by on public.seo_redirects(created_by);

drop policy if exists product_relations_admin_write on public.product_relations;
create policy product_relations_admin_insert on public.product_relations for insert to authenticated with check (is_admin());
create policy product_relations_admin_update on public.product_relations for update to authenticated using (is_admin()) with check (is_admin());
create policy product_relations_admin_delete on public.product_relations for delete to authenticated using (is_admin());

drop policy if exists product_reviews_admin_write on public.product_reviews;
drop policy if exists product_reviews_customer_insert on public.product_reviews;
drop policy if exists product_reviews_customer_update_pending on public.product_reviews;
drop policy if exists product_reviews_public_read on public.product_reviews;
create policy product_reviews_read on public.product_reviews
for select to anon, authenticated
using (status = 'published' or is_admin() or user_id = (select auth.uid()));
create policy product_reviews_insert on public.product_reviews
for insert to authenticated
with check (is_admin() or (user_id = (select auth.uid()) and status = 'pending'));
create policy product_reviews_update on public.product_reviews
for update to authenticated
using (is_admin() or (user_id = (select auth.uid()) and status = 'pending'))
with check (is_admin() or (user_id = (select auth.uid()) and status = 'pending'));
create policy product_reviews_delete on public.product_reviews
for delete to authenticated using (is_admin());

drop policy if exists shipping_methods_admin_write on public.shipping_methods;
create policy shipping_methods_admin_insert on public.shipping_methods for insert to authenticated with check (is_admin());
create policy shipping_methods_admin_update on public.shipping_methods for update to authenticated using (is_admin()) with check (is_admin());
create policy shipping_methods_admin_delete on public.shipping_methods for delete to authenticated using (is_admin());

drop policy if exists promotions_admin_write on public.promotions;
create policy promotions_admin_insert on public.promotions for insert to authenticated with check (is_admin());
create policy promotions_admin_update on public.promotions for update to authenticated using (is_admin()) with check (is_admin());
create policy promotions_admin_delete on public.promotions for delete to authenticated using (is_admin());

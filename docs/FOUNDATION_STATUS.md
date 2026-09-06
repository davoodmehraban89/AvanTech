# AvanTech Foundation Status

## Connected services

- GitHub repository: `davoodmehraban89/AvanTech`
- Supabase project: `AvanTech`
- Supabase region: `eu-central-1`
- Supabase project status: active and healthy
- Storage bucket: `product-media` (public delivery, admin-only mutation policy)
- Production deployment direction: Cloudflare Worker + OpenNext

## Database foundation

Applied migrations establish:

- profiles and roles
- brands and hierarchical categories
- products and product variants
- dynamic attribute definitions and values
- product media
- product compatibility/accessory/alternative/bundle relations
- product reviews and moderation state
- customer addresses
- inventory locations and stock
- variant prices
- carts and cart items
- orders and order items
- payment attempts
- order status history
- shipping methods
- promotions
- import batches and item-level import review
- SEO redirect management
- Launch & Health Center checks
- integration configuration references
- audit logs
- row-level security policies

## Security

- RLS is enabled on application tables.
- Security advisor reports no security lints after the current database expansion.
- No service-role key or private secret is committed to GitHub.
- Iranian payment, SMS, shipping and marketplace integrations remain adapter-based and are not hard-coded into the core.

## Web foundation

Branch: `main`

Current stack:

- Next.js 16
- React 19
- TypeScript strict mode
- RTL-first root document
- AvanTech base design tokens
- Supabase SSR/client packages
- OpenNext Cloudflare adapter
- Wrangler / Cloudflare Worker deployment

## Reproducibility

Database migration sources are now tracked under `supabase/migrations/`.
Database structure is documented in `docs/DATABASE_SCHEMA.md`.

## Next steps

1. Commit generated Supabase TypeScript database types.
2. Configure typed server/browser Supabase clients.
3. Seed the initial brand/category taxonomy.
4. Bootstrap admin authentication and role assignment.
5. Build catalog/admin CRUD on top of the new schema.
6. Add CI typecheck/build validation for Worker deployment.

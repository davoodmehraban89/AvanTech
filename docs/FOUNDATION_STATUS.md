# AvanTech Foundation Status

## Connected services

- GitHub repository: `davoodmehraban89/AvanTech`
- Supabase organization: `AvanTech`
- Supabase project: `AvanTech`
- Supabase region: `eu-central-1`
- Supabase project status: active and healthy
- Storage bucket: `product-media` (public delivery, admin-only mutation policy)

## Database foundation

Applied migrations establish:

- profiles and roles
- brands and hierarchical categories
- products and product variants
- dynamic attribute definitions and values
- product media
- customer addresses
- inventory locations and stock
- variant prices
- carts and cart items
- orders and order items
- payment attempts
- order status history
- integration configuration references
- audit logs
- row-level security policies

## Security

- RLS is enabled on application tables.
- Security advisor currently reports no security lints.
- No service-role key or private secret is committed to GitHub.
- Iranian payment, SMS, shipping and marketplace integrations remain adapter-based and are not hard-coded into the core.

## Web foundation

Branch: `foundation-stack`

Initial stack:

- Next.js 16 Active LTS
- React 19
- TypeScript strict mode
- RTL-first root document
- AvanTech base design tokens
- Supabase SSR/client packages

## Next steps

1. Add reproducible Supabase migration files to the repository.
2. Add generated database TypeScript types.
3. Configure server/browser Supabase clients through environment variables.
4. Add CI typecheck/build workflow.
5. Decide deployment target and connect preview deployments.
6. Seed the initial brand/category taxonomy.
7. Create admin authentication bootstrap and role assignment flow.

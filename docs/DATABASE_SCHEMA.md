# AvanTech Database Schema

Status: active foundation on Supabase PostgreSQL

## Catalog

- `brands`
- `categories` (hierarchical)
- `products`
- `product_variants`
- `attribute_definitions`
- `variant_attribute_values`
- `product_media`
- `product_relations` (`compatibility`, `accessory`, `alternative`, `bundle`)
- `product_reviews`
- `variant_prices`
- `inventory_locations`
- `inventory_stock`

## Import & product operations

- `import_batches`
- `import_items`

Import flow:

`source -> extraction -> normalization -> duplicate detection -> review -> approval/rejection -> product`

## Customer & commerce

- `profiles`
- `customer_addresses`
- `carts`
- `cart_items`
- `orders`
- `order_items`
- `order_status_history`
- `payment_attempts`
- `shipping_methods`
- `promotions`

## SEO & operations

- `seo_redirects`
- `health_checks`
- `integration_configs`
- `audit_logs`

## Core relations

```text
brands 1---N products N---1 categories
                    |
                    +---N product_variants
                    |        |
                    |        +---N variant_prices
                    |        +---N inventory_stock ---1 inventory_locations
                    |        +---N variant_attribute_values ---1 attribute_definitions
                    |
                    +---N product_media
                    +---N product_reviews
                    +---N product_relations ---N products

profiles/auth.users 1---N customer_addresses
profiles/auth.users 1---N carts ---N cart_items ---1 product_variants
profiles/auth.users 1---N orders ---N order_items ---1 product_variants
orders 1---N payment_attempts
orders 1---N order_status_history

import_batches 1---N import_items ---0..1 products
```

## Product lifecycle

`draft -> review -> seo_review -> published -> archived`

## Order lifecycle

`pending_payment -> paid -> confirmed -> preparing -> packed -> handed_to_carrier -> shipped -> delivered`

Exception states include `cancelled`, `return_requested`, `returned`, and `refunded`.

## Security

- RLS enabled on application tables.
- Public catalog reads are restricted to published/active records.
- Customer-owned data is restricted by `auth.uid()` policies.
- Admin mutations use the `is_admin()` policy helper.
- Import, SEO redirect, integration, health and audit operations are admin-restricted.

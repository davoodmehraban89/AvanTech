# AvanTech Product Discovery Book

> Status: Discovery v0.1
> Purpose: define the product, architecture, Iranian commerce requirements, global-grade UX principles, SEO, data model direction, and phased roadmap before implementation.

## 1. Product identity

AvanTech is a Persian-first, bilingual technology commerce platform focused on premium consumer technology and gaming ecosystems. It is not intended to be a generic marketplace clone. The product should combine:

- a calm, premium, modern AvanTech core design language;
- specialized brand experiences for Apple, PlayStation/Sony, Xbox/Microsoft, Nintendo, Meta/XR and selected mobile brands;
- strong product data, comparison, search and filtering;
- Iranian e-commerce compatibility including trust, payment, shipping and marketplace integrations;
- robust SEO and content infrastructure;
- a future-safe admin and product import architecture;
- a zero-to-low-cost infrastructure strategy at launch.

Primary language: Persian (RTL). Secondary language: English (LTR).

## 2. Product principles

1. **One platform, multiple brand worlds.** AvanTech keeps a consistent navigation, information architecture and commerce system, while brand sections can adapt typography, motion, accent colors and visual atmosphere.
2. **Product data is an asset.** Product information must live in AvanTech's own structured database, not depend on live third-party pages.
3. **Import is draft-first.** Any imported content enters a draft/review workflow before publication.
4. **SEO is architecture, not a plugin.** URL structure, metadata, schema, sitemaps, canonical URLs, indexability and performance are planned from day one.
5. **Iranian commerce is a compatibility layer.** Enamad, Torob, payment gateways, installment providers, SMS and shipping integrations must be modular.
6. **No vendor lock-in at the data layer.** Core entities and exports must be portable.
7. **Security and auditability are mandatory.** Admin actions, order state changes, payment transitions and sensitive configuration changes must be traceable.
8. **Mobile-first, but not mobile-only.** The storefront and admin must work well on phones and desktops.
9. **Accessibility and performance are product requirements.** Visual quality must not come at the cost of speed or usability.

## 3. Initial brand and category architecture

### 3.1 Apple
- iPhone
- iPad
- Mac
- Apple Watch
- AirPods
- Vision / spatial products
- Apple accessories

### 3.2 Gaming
#### Sony / PlayStation
- PlayStation consoles
- DualSense and controllers
- PlayStation accessories
- Games
- headsets, charging, storage and peripherals

#### Microsoft / Xbox
- Xbox Series consoles
- Xbox controllers
- Game Pass / digital products where legally and commercially appropriate
- accessories
- games

#### Nintendo
- Nintendo Switch family
- Nintendo Switch 2 family
- Joy-Con / Pro controllers
- accessories
- games

### 3.3 Meta / XR
- Meta Quest
- Ray-Ban Meta and smart glasses
- XR accessories

### 3.4 Mobile and selected consumer tech
- Samsung
- Xiaomi
- Google Pixel (subject to commercial availability)
- selected accessories and wearables

## 4. Brand Experience System

AvanTech uses a **Hybrid Brand Experience** model.

- approximately 70% of interface rules remain AvanTech-native: navigation, cart, account, product cards, search, compare, typography hierarchy, spacing and interaction patterns;
- approximately 30% may adapt per brand world: accent palette, hero composition, motion language, background treatment, imagery framing and editorial tone.

The purpose is immersion without making users feel they have left AvanTech.

### Apple world
Minimal, bright, spacious, restrained motion, product-led imagery.

### PlayStation world
Cinematic, darker, immersive, subtle motion and high-contrast product storytelling.

### Xbox world
Modern, modular, technically confident, restrained green accent and ecosystem orientation.

### Nintendo world
Friendly, energetic and playful while preserving AvanTech usability standards.

### Meta / XR world
Futuristic, airy, spatial, glass-like and experience-oriented.

Direct visual cloning of brand websites is not the objective.

## 5. Iranian e-commerce compatibility layer

Research from the user's existing Iranian store admin and public Iranian commerce patterns indicates these capabilities should be planned as modular features.

### Core at launch or early production
- store identity and contact settings;
- customer registration and login;
- OTP and/or password authentication strategy;
- terms acceptance and legal pages;
- customer addresses;
- product, brand, category and attribute management;
- order management and manual order creation;
- payment state tracking;
- shipping methods;
- Enamad placement/configuration;
- Google Search Console, sitemap, Analytics and Tag Manager compatibility;
- Torob integration architecture;
- import/export, especially Excel/CSV;
- product reviews/moderation;
- order and customer reports.

### Planned integration adapters
- Enamad;
- Torob;
- Emalls or similar comparison engines if commercially useful;
- online payment gateway adapters;
- card-to-card/manual payment;
- cash on delivery where operationally feasible;
- installment providers such as SnappPay or future providers;
- SMS providers;
- shipping providers / post / Tipax / courier;
- analytics and chat tools through generic script/config adapters rather than hard-coding every vendor.

### Explicitly excluded from AvanTech core
- subscription purchase flow belonging to a third-party store-builder business model;
- vendor-specific onboarding steps that exist only because the reference platform sells subscriptions;
- unnecessary duplicate chat/advertising integrations.

## 6. Store setup and operations center

AvanTech should have a persistent **Launch & Health Center**, not just a one-time setup wizard.

Suggested checks:
- store identity complete;
- domain and SSL ready;
- legal pages and trust settings ready;
- first category/brand/product created;
- payment configured;
- shipping configured;
- sitemap and Search Console ready;
- analytics ready;
- marketplace feeds ready;
- products missing SEO, images, price or stock warnings;
- broken integration warnings.

This should evolve into an operational health dashboard after launch.

## 7. Product information architecture

A product is not a flat record. Core entities should support:

- product family / model;
- brand;
- category;
- localized title and description;
- variant(s): color, storage, region, edition, bundle, etc.;
- SKU / internal identifier;
- price history and current price;
- stock status and quantity;
- warranty / seller notes where relevant;
- media gallery;
- structured specifications;
- compatibility relationships;
- related accessories;
- comparison attributes;
- SEO metadata;
- publication state;
- source provenance;
- import history;
- moderation/review status.

### Product state model
Draft -> Review -> SEO check -> Publish -> Update/Archive

Imported content never bypasses review by default.

## 8. Product Import Engine

### Initial import sources
- manual entry;
- Excel/CSV;
- approved URL import workflow;
- later: official source/API adapters.

### URL import pipeline
Source URL -> fetch/parse -> structured extraction -> normalization -> duplicate detection -> image handling -> AI-assisted cleanup -> draft -> human review -> publish.

### Source policy
Third-party data is used as a research/import source, not a permanent runtime dependency. The system stores source URL and provenance. Copyright-sensitive editorial text should not be blindly republished; descriptions should be reviewed and, where appropriate, independently rewritten. Image usage must be reviewed for rights and source policy.

## 9. Search, filtering and comparison

Iranian specialist stores demonstrate that users expect category-specific filters such as availability, price, brand, color, compatibility and technical attributes. AvanTech should use dynamic filters driven by attribute schemas rather than manually coding each category.

Examples:
- console: brand, generation, edition, storage, disc/digital, bundle;
- controller: platform compatibility, connection type, color, wired/wireless;
- phone: storage, RAM, color, screen size, network generation;
- headset: platform, connection, microphone, wireless standard.

Comparison must use normalized attributes, not free text.

## 10. Order architecture

Core order lifecycle:

Created -> payment pending -> payment confirmed -> confirmed -> preparing -> packed -> handed to carrier -> shipped -> delivered.

Exception paths:
- payment failed;
- customer cancelled;
- admin cancelled;
- return requested;
- returned;
- refund pending;
- refunded.

Every state change should record timestamp, actor and reason.

Admin should support manual order creation for phone, WhatsApp or in-person sales.

## 11. Cart recovery and payment observability

Reference admin screenshots show abandoned carts and payment transaction states. AvanTech should treat both as operational signals.

- abandoned cart record with privacy-aware customer reference;
- recovery eligibility and communication history;
- transaction attempt history;
- provider response/reference IDs;
- failed/started/completed state;
- reconciliation support;
- refund traceability.

No sensitive payment credentials are stored in logs.

## 12. SEO architecture

SEO is a core product capability.

### Technical SEO
- semantic URLs;
- server-rendered / statically generated indexable pages where appropriate;
- canonical URLs;
- XML sitemap generation;
- robots.txt management;
- hreflang for Persian/English where both versions exist;
- structured data for Product, Breadcrumb, Organization and applicable content types;
- Open Graph and social metadata;
- Core Web Vitals and image optimization;
- redirect management when slugs change;
- pagination/indexation strategy;
- noindex controls for admin, account and internal search pages as appropriate.

### Content SEO
- category landing pages with useful editorial content;
- product pages with unique structured specifications and helpful summaries;
- comparison pages;
- buying guides;
- FAQ where genuinely useful;
- editorial/news content only where it serves user intent.

### Search Console/analytics
- Search Console verification and sitemap submission;
- Google Analytics support;
- Google Tag Manager support;
- optional Microsoft Clarity through generic analytics integration.

## 13. Admin architecture

Top-level admin modules proposed:

1. Dashboard & Health
2. Orders
3. Products
4. Inventory / Availability
5. Customers
6. Content & Reviews
7. Promotions
8. Reports
9. SEO
10. Integrations
11. Payments
12. Shipping
13. Settings
14. Audit Log

### Product module
- product list;
- add/edit;
- bulk import;
- brands;
- categories;
- attribute schemas;
- variants;
- reviews;
- source/import history.

### Order module
- order list;
- manual order creation;
- abandoned carts;
- payment attempts;
- returns/refunds;
- filters, sorting and export.

## 14. Infrastructure direction (discovery decision, not final production lock)

The user requires a no-cost or very-low-cost starting point and prefers Google's ecosystem.

Current candidate architecture:

- GitHub: source control and durable project history;
- Next.js + TypeScript: storefront/admin web application;
- Cloudflare Pages/Workers: deployment and edge delivery candidate;
- Firebase: candidate for Authentication, Firestore and selected Google integrations;
- Gemini: AI-assisted product normalization/content tooling;
- Google Search Console / Analytics / Tag Manager: SEO and analytics stack.

### Important cost caveat
Firebase Phone Authentication is not free in all regions and SMS verification can create cost. OTP architecture must therefore be provider-abstracted rather than hard-wired to Firebase SMS.

Cloudflare's free plan has execution/request limits, so the application should minimize server function invocations and serve static/cacheable commerce pages aggressively.

The data layer remains under evaluation until the product data model is finalized. A relational database may be preferable for orders, variants, inventory and reporting; Firebase remains attractive for Google ecosystem integration and no-cost prototyping. This decision must be made before implementation, not after data accumulation.

## 15. Security baseline

- no secrets in client code or GitHub;
- environment-separated secrets;
- least-privilege admin roles;
- audit log for admin changes;
- rate limiting for auth/import endpoints;
- CSRF/XSS/SSRF controls where applicable;
- safe URL importer with allow/deny rules, timeouts and no internal-network access;
- payment callbacks verified server-side;
- webhook replay protection;
- backup/export strategy;
- dependency scanning and CI checks;
- privacy-aware logging;
- sensitive configuration masked in admin.

## 16. Accessibility and UX quality gates

- RTL-first layouts and proper LTR islands for English/spec codes;
- keyboard accessibility;
- visible focus states;
- contrast compliance;
- reduced-motion support;
- responsive tables/admin alternatives on mobile;
- loading, empty, error and offline-aware states;
- no unnecessary modal overload;
- consistent design tokens across all brand worlds.

## 17. Phased roadmap

### Phase 0 — Discovery and architecture
- competitor/reference research;
- product/category model;
- admin requirements;
- Iranian integrations;
- SEO architecture;
- infrastructure decision;
- security baseline.

### Phase 1 — Foundation
- repository structure;
- Next.js/TypeScript setup;
- design system;
- bilingual/RTL foundations;
- CI/CD;
- environments;
- database/auth foundation.

### Phase 2 — Apple world and core catalog
- first brand experience;
- category pages;
- product detail;
- search/filter;
- comparison foundation;
- admin product management.

### Phase 3 — Sony / PlayStation world
- console, controller, accessory and game taxonomy;
- PlayStation-specific filters and visual layer.

### Phase 4 — Xbox world
- Xbox taxonomy;
- compatibility and accessories;
- Xbox-specific visual layer.

### Phase 5 — Nintendo world
- Switch/Switch 2 taxonomy;
- games/controllers/accessories;
- Nintendo-specific visual layer.

### Phase 6 — Meta/XR and selected mobile
- Quest, Ray-Ban Meta and XR accessories;
- selected Samsung/Xiaomi/mobile categories.

### Phase 7 — Commerce
- cart;
- checkout;
- customer accounts;
- addresses;
- orders;
- shipping;
- payment adapters;
- refunds/returns.

### Phase 8 — Iran integrations
- Enamad placement/config;
- Torob feed/integration;
- SMS;
- payment gateway(s);
- installment provider adapters;
- shipping adapters.

### Phase 9 — Intelligence and import
- URL import;
- duplicate detection;
- structured extraction;
- AI normalization;
- editorial/SEO assist;
- bulk operations.

### Phase 10 — Growth, analytics and hardening
- advanced SEO;
- content/guide system;
- analytics dashboards;
- abandoned cart recovery;
- performance hardening;
- security review;
- backup and disaster recovery.

## 18. Research references used in discovery

- User-provided screenshots of appliastore.ir admin, covering onboarding/setup, store settings, Enamad, Torob, Google tools, Microsoft Clarity, analytics/chat tokens, API tokens, customer auth, address, products, orders, abandoned carts, payments, reports and admin navigation.
- Technolife public category pages for console, PlayStation/Xbox/Nintendo controllers, games and accessories, used to validate category-specific filtering and content patterns.
- Google Search Central / Next.js documentation for metadata, sitemap and technical SEO direction.
- Firebase, Cloudflare and Supabase public pricing/docs for current free-tier constraints and architecture evaluation.

## 19. Open decisions before coding

1. Final data layer: Firestore, Postgres/Supabase, or hybrid.
2. Hosting runtime: Cloudflare-first vs Google-hosted path.
3. Authentication: email/password, OTP provider abstraction, social login scope.
4. Product image ownership/storage policy.
5. Legal/compliance boundaries of third-party product importing.
6. Initial payment/shipping providers.
7. Final Persian/English URL and content localization policy.
8. Search engine implementation for catalog scale.
9. Inventory model: single stock source vs multi-location future-proofing.
10. Whether marketplace/multi-seller capability is explicitly out of scope for V1.

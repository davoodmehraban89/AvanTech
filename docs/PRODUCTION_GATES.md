# AvanTech production gates — first hardening increment

Base: main at 40b823cdad00a76705eeb823b5d0b8e4d2abb092.

## Implemented and verified locally
- Pure request contract accepts variant IDs, bounded integer quantities, address and an idempotency key only; rejects client totals, identity, role, discounts and prices.
- Server-side quote rules validate publication, stock minus reservations, exactly one active price window, IRR currency and safe integer arithmetic.
- Bounded UTF-8 JSON reader checks actual streamed byte count, not Content-Length.
- Broken financial route is fail-closed. Checkout shows network/error/busy states and never clears the cart on an unverified response.
- 44 executable domain/request tests pass using Node 24. Strict TypeScript check for these standalone modules is required separately.
- CI workflow runs independent core tests without downloading application dependencies.

## Important limits
These modules are not yet a complete checkout service. The quote function does not lock inventory, verify authentication, create an order, charge money or persist idempotency. The bounded reader does not implement distributed rate limiting. The financial endpoint intentionally returns 503. No live database, payment provider, shipping provider or existing main branch is changed by this draft.

## Required before enabling financial writes
1. Validate the authenticated user on the server; never accept userId/role from the request.
2. Apply the domain contract, CSRF/origin protection, bounded-body reading and shared rate limiting.
3. Load verified catalog values with a trusted server adapter.
4. In one database transaction, lock relevant stock, recheck prices/availability, reserve stock, insert order and snapshot line items, and persist the idempotency key uniquely per customer with a payload hash. Retry must return the original result; a changed payload must be rejected.
5. Define reservation expiry/release and rollback for payment failure/cancelation.
6. Verify payment via provider API on the server, not query-string success; enforce amount, currency, order ownership, replay protection and legal state transitions.
7. Test parallel last-stock purchases, repeated callbacks, failed writes, retries after timeouts and refund reconciliation in an isolated test environment.

## Storefront release gates
- Fix missing CSS pipeline and invalid navigation routes in original Next application.
- Typed product view model joins product, variants, media and price data; explicit IRR-to-toman display policy.
- Persist selected variants, not just parent products; validate browser storage.
- Mobile/desktop browser tests, keyboard navigation, RTL/LTR isolation, font and contrast checks.
- Real catalog provenance, licensed imagery, accurate stock and warranty/registration information.
- Provider-backed shipping, OTP/email setup, seller details and approved policies.
- Backups with tested restores, monitoring, least privilege, dependency lockfile and reproducible full Worker build.

## Next external evidence needed
Cloudflare build logs for the failing original deployment targets; the GitHub check summaries do not contain the failure cause. Do not remove or repoint the existing Cloudflare projects based only on their names.

Select the production payment and shipping providers before implementing their adapters. Configure any credentials through the provider's official connection/environment flow, never through chat.

/** Pure checkout rules. Call only with catalog data loaded by a trusted server.
 * A quote is NOT a stock reservation or payment authorization. Revalidate and
 * reserve atomically in the database before creating an order.
 */
export class CommerceError extends Error {
  constructor(public code: string) { super(code); this.name = 'CommerceError'; }
}
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const fail = (code: string): never => { throw new CommerceError(code); };
function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail('INVALID_OBJECT');
  return value as Record<string, unknown>;
}
function exact(value: Record<string, unknown>, keys: string[]) {
  if (Object.keys(value).some(key => !keys.includes(key))) fail('UNEXPECTED_FIELD');
}
function text(value: unknown, min: number, max: number): string {
  if (typeof value !== 'string') fail('INVALID_TEXT');
  const result = (value as string).trim();
  if (result.length < min || result.length > max || /[\u0000-\u001f\u007f]/.test(result)) fail('INVALID_TEXT');
  return result;
}
export function normalizeDigits(value: string): string {
  return value.replace(/[۰-۹٠-٩]/g, c => String(c.charCodeAt(0) >= 1776 ? c.charCodeAt(0) - 1776 : c.charCodeAt(0) - 1632));
}
export type CheckoutInput = {
  idempotencyKey: string;
  items: { variantId: string; quantity: number }[];
  address: { recipientName: string; phone: string; province: string; city: string; addressLine: string; postalCode: string };
};
export function parseCheckout(value: unknown): CheckoutInput {
  const body = record(value);
  // userId, prices, totals, discounts, order status and role are never accepted.
  exact(body, ['idempotencyKey', 'items', 'address']);
  if (typeof body.idempotencyKey !== 'string' || !uuid.test(body.idempotencyKey)) fail('INVALID_IDEMPOTENCY_KEY');
  if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 50) fail('INVALID_ITEMS');
  const seen = new Set<string>();
  const items = (body.items as unknown[]).map(raw => {
    const item = record(raw); exact(item, ['variantId', 'quantity']);
    if (typeof item.variantId !== 'string' || !uuid.test(item.variantId)) fail('INVALID_VARIANT');
    const variantId = (item.variantId as string).toLowerCase();
    if (seen.has(variantId)) fail('DUPLICATE_VARIANT');
    seen.add(variantId);
    if (typeof item.quantity !== 'number' || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 10) fail('INVALID_QUANTITY');
    return { variantId, quantity: item.quantity as number };
  });
  const address = record(body.address);
  exact(address, ['recipientName', 'phone', 'province', 'city', 'addressLine', 'postalCode']);
  const phone = normalizeDigits(text(address.phone, 11, 14)).replace(/^\+98/, '0').replace(/^0098/, '0');
  const postalCode = normalizeDigits(text(address.postalCode, 10, 10));
  if (!/^09\d{9}$/.test(phone)) fail('INVALID_PHONE');
  if (!/^\d{10}$/.test(postalCode) || /^(\d)\1{9}$/.test(postalCode)) fail('INVALID_POSTAL_CODE');
  return {
    idempotencyKey: (body.idempotencyKey as string).toLowerCase(), items,
    address: { recipientName: text(address.recipientName, 2, 100), phone,
      province: text(address.province, 2, 80), city: text(address.city, 2, 80),
      addressLine: text(address.addressLine, 10, 500), postalCode },
  };
}
export function rial(value: unknown): number {
  // Postgres numeric may arrive as a string. No floating point money or coercion.
  if (typeof value === 'string' && /^(0|[1-9]\d*)$/.test(value)) value = Number(value);
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) fail('INVALID_AMOUNT');
  return value as number;
}
export type CatalogVariant = {
  id: string; published: boolean; active: boolean; sku: string; name: string;
  quantityOnHand: number; quantityReserved: number;
  prices: { amount: number | string; currency: string; active: boolean; startsAt: string | null; endsAt: string | null }[];
};
function boundary(raw: string | null, fallback: number): number {
  if (raw === null) return fallback;
  const parsed = Date.parse(raw);
  if (!Number.isFinite(parsed)) fail('INVALID_PRICE_WINDOW');
  return parsed;
}
export function quoteOrder(input: CheckoutInput, catalog: CatalogVariant[], now: number, shippingRial: number) {
  input = parseCheckout(input);
  if (!Number.isFinite(now)) fail('INVALID_CLOCK');
  const ids = new Set(catalog.map(v => v.id));
  if (ids.size !== catalog.length) fail('AMBIGUOUS_CATALOG');
  const lines = input.items.map(item => {
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 10) fail('INVALID_QUANTITY');
    const variant = catalog.find(v => v.id === item.variantId);
    if (!variant || !variant.published || !variant.active) fail('UNAVAILABLE_VARIANT');
    const v = variant as CatalogVariant;
    const stock = rial(v.quantityOnHand), reserved = rial(v.quantityReserved);
    if (reserved > stock || stock - reserved < item.quantity) fail('INSUFFICIENT_STOCK');
    const prices = v.prices.filter(p => {
      if (!p.active) return false;
      const start = boundary(p.startsAt, -Infinity), end = boundary(p.endsAt, Infinity);
      if (start >= end) fail('INVALID_PRICE_WINDOW');
      return start <= now && now < end;
    });
    if (prices.length !== 1) fail(prices.length ? 'AMBIGUOUS_PRICE' : 'PRICE_UNAVAILABLE');
    if (prices[0].currency !== 'IRR') fail('UNSUPPORTED_CURRENCY');
    const unitPriceRial = rial(prices[0].amount);
    if (unitPriceRial === 0) fail('ZERO_PRICE_REQUIRES_REVIEW');
    return { variantId: v.id, sku: v.sku, name: v.name, quantity: item.quantity,
      unitPriceRial, lineTotalRial: rial(unitPriceRial * item.quantity) };
  });
  const subtotalRial = lines.reduce((sum, line) => rial(sum + line.lineTotalRial), 0);
  const shipping = rial(shippingRial);
  return { currency: 'IRR' as const, lines, subtotalRial, shippingRial: shipping, totalRial: rial(subtotalRial + shipping) };
}

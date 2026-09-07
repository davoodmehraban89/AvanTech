'use client';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';
export default function CheckoutForm() {
  const items = useCartStore(s => s.items);
  const total = useCartStore(s => s.total());
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  async function submitOrder() {
    if (submitting) return;
    setMessage('');
    if (!items.length) { setMessage('سبد خرید خالی است.'); return; }
    setSubmitting(true);
    try {
      // Do not send user identity, PII, or client totals to unfinished checkout.
      const res = await fetch('/api/orders', { method: 'POST', signal: AbortSignal.timeout(10000) });
      setMessage(res.ok ? 'پاسخ نیازمند بررسی است؛ تا دریافت شناسه سفارش معتبر، سبد حفظ می‌شود.' : 'ثبت سفارش فعلاً فعال نیست. سبد شما حفظ شده و پرداختی انجام نشده است.');
    } catch { setMessage('ارتباط با سرور برقرار نشد. سبد شما حفظ شده است؛ دوباره تلاش کنید.'); }
    finally { setSubmitting(false); }
  }
  return <div className="space-y-3"><p>ثبت سفارش مالی و پرداخت تا تکمیل اتصال امن فعال نمی‌شود. فعلاً نیازی به وارد کردن اطلاعات تماس و آدرس نیست.</p><div>جمع نمایشی سبد: {Number.isFinite(total) ? total.toLocaleString('fa-IR') : 'قیمت نیازمند بررسی است'}</div><button disabled={submitting || !items.length} onClick={submitOrder} className="rounded bg-black px-5 py-3 text-white">{submitting ? 'در حال بررسی…' : 'بررسی امکان ثبت سفارش'}</button><p role="status" aria-live="polite">{message}</p></div>;
}

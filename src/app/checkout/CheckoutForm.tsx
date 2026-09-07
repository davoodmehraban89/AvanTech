'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';

export default function CheckoutForm({ userId }: { userId: string }) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const total = useCartStore((s) => s.total());
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  async function submitOrder() {
    const res = await fetch('/api/orders', { method: 'POST', body: JSON.stringify({ userId, address, phone, items, total }) });
    if (res.ok) {
      clear();
      setMessage('سفارش با موفقیت ثبت شد');
      router.push('/profile');
    }
  }

  return <div className="space-y-3"><input className="w-full rounded border p-3" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="آدرس ارسال"/><input className="w-full rounded border p-3" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="شماره تماس"/><div>مبلغ کل: {total}</div><button onClick={submitOrder} className="rounded bg-black px-5 py-3 text-white">ثبت نهایی سفارش</button><p>{message}</p></div>;
}

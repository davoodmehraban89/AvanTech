import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function CheckoutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <main className="mx-auto max-w-3xl p-4">
      <div className="rounded-xl border p-6 space-y-4">
        <h1 className="text-2xl font-bold">تسویه حساب</h1>
        <p>سبد خرید و ثبت سفارش در این مرحله به حساب کاربری متصل شد.</p>
        <form className="space-y-3">
          <input className="w-full rounded border p-3" placeholder="آدرس ارسال" />
          <input className="w-full rounded border p-3" placeholder="شماره تماس" />
          <button className="rounded bg-black px-5 py-3 text-white">ثبت نهایی سفارش</button>
        </form>
      </div>
    </main>
  );
}

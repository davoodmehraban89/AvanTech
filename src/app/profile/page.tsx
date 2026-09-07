import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getUserOrders } from '@/services/orders';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const orders = await getUserOrders(user.id);

  return (
    <main className="mx-auto max-w-5xl p-4 space-y-6">
      <section className="rounded-xl border p-6">
        <h1 className="text-2xl font-bold">حساب کاربری</h1>
        <p className="mt-2">{user.email}</p>
      </section>
      <section className="rounded-xl border p-6">
        <h2 className="text-xl font-bold">سفارشات من</h2>
        <div className="mt-4 space-y-3">
          {orders.length === 0 ? <p>سفارشی ثبت نشده است.</p> : orders.map((order) => (
            <div key={order.id} className="rounded border p-3">سفارش {order.id}</div>
          ))}
        </div>
      </section>
    </main>
  );
}

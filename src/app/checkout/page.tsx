import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import CheckoutForm from './CheckoutForm';

export default async function CheckoutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <main className="mx-auto max-w-3xl p-4">
      <div className="rounded-xl border p-6 space-y-4">
        <h1 className="text-2xl font-bold">تسویه حساب</h1>
        <CheckoutForm />
      </div>
    </main>
  );
}

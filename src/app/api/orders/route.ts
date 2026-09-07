import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const { userId, address, phone, items, total } = await request.json();
  const supabase = await createClient();

  const { data: order, error } = await supabase.from('orders').insert({ user_id: userId, shipping_address: address, phone, total_amount: total, status: 'pending' }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const { error: itemsError } = await supabase.from('order_items').insert(items.map((item: {id:string; quantity:number; price:number}) => ({ order_id: order.id, product_id: item.id, quantity: item.quantity, price: item.price })));
  if (itemsError) return NextResponse.json({ error: itemsError.message }, { status: 400 });

  return NextResponse.json({ order });
}

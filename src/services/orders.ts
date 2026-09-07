import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';

type Order = Database['public']['Tables']['orders']['Row'];

export async function getUserOrders(userId:string):Promise<Order[]> {
 const supabase=await createClient();
 const {data,error}=await supabase.from('orders').select('*').eq('user_id',userId).order('created_at',{ascending:false});
 if(error) throw new Error(error.message);
 return data ?? [];
}

export async function createOrder(order:Database['public']['Tables']['orders']['Insert']):Promise<Order>{
 const supabase=await createClient();
 const {data,error}=await supabase.from('orders').insert(order).select().single();
 if(error) throw new Error(error.message);
 return data;
}

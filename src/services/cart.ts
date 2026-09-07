import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';

type Cart = Database['public']['Tables']['carts']['Row'];

export async function getUserCart(userId:string):Promise<Cart|null>{
 const supabase=await createClient();
 const {data,error}=await supabase.from('carts').select('*').eq('user_id',userId).single();
 if(error && error.code!=='PGRST116') throw new Error(error.message);
 return data;
}

export async function getCartItems(cartId:string){
 const supabase=await createClient();
 const {data,error}=await supabase.from('cart_items').select('*').eq('cart_id',cartId);
 if(error) throw new Error(error.message);
 return data ?? [];
}

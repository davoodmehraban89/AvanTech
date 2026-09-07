import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

export async function getProfile(userId:string):Promise<Profile|null>{
 const supabase=await createClient();
 const {data,error}=await supabase.from('profiles').select('*').eq('id',userId).single();
 if(error && error.code!=='PGRST116') throw new Error(error.message);
 return data;
}

export async function getAddresses(userId:string){
 const supabase=await createClient();
 const {data,error}=await supabase.from('customer_addresses').select('*').eq('user_id',userId);
 if(error) throw new Error(error.message);
 return data ?? [];
}

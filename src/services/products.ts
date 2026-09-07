import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';

type Product = Database['public']['Tables']['products']['Row'];

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
  if (error && error.code !== 'PGRST116') throw new Error(error.message);
  return data;
}

export async function getProductDetails(productId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('products').select('*, product_variants(*), product_media(*), categories(*), brands(*)').eq('id', productId).single();
  if (error) throw new Error(error.message);
  return data;
}

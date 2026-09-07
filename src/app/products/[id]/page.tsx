import { getProductDetails } from '@/services/products';
import AddToCartButton from '@/components/product/AddToCartButton';

export default async function ProductPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 const product=await getProductDetails(id);
 return <main className="mx-auto max-w-6xl p-4 grid gap-6 md:grid-cols-2">
  <div className="rounded-xl bg-gray-100 aspect-square flex items-center justify-center">{product.product_media?.[0]?.url ? <img src={product.product_media[0].url} alt={product.name}/> : 'No image'}</div>
  <section><h1 className="text-3xl font-bold">{product.name}</h1><p className="mt-4">{product.description}</p><p className="text-xl mt-4">{product.price}</p><p>موجودی: {product.stock ?? 'بررسی شود'}</p><AddToCartButton product={product}/></section>
 </main>
}
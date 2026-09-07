'use client';
import { useCartStore } from '@/store/cart';
export default function AddToCartButton({product}:{product:any}){
 const add=useCartStore(s=>s.add);
 return <button className="mt-6 rounded-lg bg-black px-5 py-3 text-white" onClick={()=>add({id:product.id,name:product.name,price:product.price,image:product.product_media?.[0]?.url,quantity:1})}>افزودن به سبد خرید</button>
}
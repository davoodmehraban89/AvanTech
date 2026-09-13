import { getProducts } from '@/services/products';
import Catalog from './Catalog';
export default async function ProductsPage(){
 try {const products=await getProducts();return <main className="storefront"><Catalog products={products.map(p=>({id:String(p.id),name:String(p.name),description:typeof p.description==='string'?p.description:''}))}/></main>;}
 catch{return <main className="storefront"><section className="catalog-state" role="status"><h1>کاتالوگ موقتاً در دسترس نیست</h1><p>دریافت اطلاعات کامل نشد. کمی بعد دوباره تلاش کنید.</p><a href="/products">تلاش مجدد</a></section></main>;}
}

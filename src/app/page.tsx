import { getProducts } from '@/services/products';
import ProductCard from '@/components/product/ProductCard';

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-7xl p-4">
      <section className="rounded-2xl bg-black p-8 text-white">
        <h1 className="text-4xl font-bold">AvanTech</h1>
        <p className="mt-3">فروشگاه تخصصی فناوری و گیمینگ</p>
      </section>
      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} name={product.name} />
        ))}
      </section>
    </main>
  );
}

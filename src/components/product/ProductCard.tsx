type ProductCardProps = {
  name: string;
  price?: number | null;
  image?: string | null;
};

export default function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border bg-white">
      {image ? <img src={image} alt={name} className="h-48 w-full object-cover" /> : <div className="h-48 bg-gray-100" />}
      <div className="p-4">
        <h3 className="font-semibold">{name}</h3>
        <p className="mt-2">{price ? `${price.toLocaleString()} تومان` : 'تماس بگیرید'}</p>
        <button className="mt-4 w-full rounded-lg bg-black px-4 py-2 text-white">افزودن به سبد خرید</button>
      </div>
    </article>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductDetails } from '@/services/products';
import './product-detail.css';

export default async function ProductPage({params}:{params:Promise<{id:string}>}) {
 const {id}=await params;
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) notFound();
 let product: Awaited<ReturnType<typeof getProductDetails>>;
 try { product=await getProductDetails(id); }
 catch { return <main className="detail-shell"><Link href="/#collection">← بازگشت به محصولات</Link><section className="detail-notice" role="status"><h1>اطلاعات محصول فعلاً در دسترس نیست.</h1><p>دریافت اطلاعات کامل نشد. کمی بعد دوباره مراجعه کن.</p></section></main>; }
 if(!product) notFound();
 return <main className="detail-shell">
 <nav className="detail-breadcrumb" aria-label="مسیر صفحه"><Link href="/">خانه</Link><span>/</span><Link href="/#collection">محصولات</Link><span>/</span><span>{product.name}</span></nav>
 <div className="detail-layout"><section className="detail-visual" aria-label="تصویر محصول"><span aria-hidden="true">AV.</span><p>تصویر تأییدشده محصول به‌زودی اضافه می‌شود</p></section>
 <section className="detail-copy"><p className="detail-eyebrow">AVANTECH / COLLECTION</p><h1>{product.name}</h1><span className="detail-badge">اطلاعات در حال تکمیل</span><p className="detail-description">{product.description || 'مشخصات و توضیحات این محصول هنوز تکمیل نشده است.'}</p>
 <div className="detail-purchase"><h2>قیمت و موجودی در حال بررسی</h2><p>تا تأیید گونه محصول، قیمت و موجودی، امکان افزودن به سبد و ثبت سفارش فعال نیست.</p><button type="button" disabled>خرید هنوز فعال نشده</button><Link href="/#collection">مشاهده محصولات دیگر ←</Link></div>
 <div className="detail-facts"><div><strong>قیمت شفاف</strong><p>مبلغ نهایی پس از تکمیل اطلاعات نمایش داده می‌شود.</p></div><div><strong>مشخصات دقیق</strong><p>رنگ، ظرفیت و شرایط هر گونه باید پیش از خرید مشخص شود.</p></div></div></section></div>
 <section className="detail-notice"><h2>پیش از انتخاب</h2><p>این فروشگاه در حال توسعه است. اطلاعات ضمانت، ارسال و شرایط خرید پس از نهایی‌شدن نمایش داده می‌شود.</p></section>
 </main>;
}

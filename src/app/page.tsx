import Link from 'next/link';
import { getProducts } from '@/services/products';

const worlds = [
 {name:'Apple',fa:'خلاقیت، بدون مرز',kind:'apple',symbol:'◉',desc:'از ایده‌های روزمره تا کارهای بزرگ'},
 {name:'PlayStation',fa:'یک مرحله فراتر',kind:'play',symbol:'△ ○ × □',desc:'دنیایی برای غرق شدن در بازی'},
 {name:'Xbox',fa:'بازی، به سبک تو',kind:'xbox',symbol:'X',desc:'تجربه‌های تازه، دنیاهای تازه'},
 {name:'Nintendo',fa:'سهم روزانه شادی',kind:'nintendo',symbol:'◖ ◗',desc:'لحظه‌هایی برای با هم بازی کردن'},
];
export default async function HomePage(){
 let products: Awaited<ReturnType<typeof getProducts>> = []; let unavailable=false;
 try { products = await getProducts(); } catch { unavailable=true; }
 return <main id="top" className="storefront">
 <section className="campaign"><div className="campaign-copy"><p className="kicker">AVANTECH / NEXT CHAPTER</p><h1>معمولی انتخاب نکن.<br/><em>جهان خودت را بساز.</em></h1><p className="campaign-lead">از تمرکز عمیق تا هیجان آخرین مرحله؛<br/>فناوری‌ای که با دنیای تو هماهنگ است.</p><div className="hero-actions"><a className="primary-action" href="#collection">کشف محصولات <span>↙</span></a><a className="secondary-action" href="#worlds">جهان‌های آون‌تک</a></div><p className="campaign-note">تکنولوژی، خلاقیت و بازی — در یک مقصد</p></div>
 <div className="campaign-art" role="img" aria-label="تصویر مفهومی کنسول و کنترلر بازی در فضایی سبز و تیره"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><span className="art-caption">PLAY HAS NO LIMIT.</span><div className="console"><i/><b/><span>AV / 01</span></div><div className="controller"><span className="dpad">✚</span><span className="controller-dot"/><span className="buttons">●<br/>● ●</span></div><span className="art-index">DESIGNED FOR YOUR NEXT MOVE<br/>01 — THE PLAY EDITION</span></div></section>
 <div className="brand-strip" aria-label="حوزه‌های مورد توجه آون‌تک"><span>دنیای تو، انتخاب تو</span><b>Apple</b><b>PlayStation</b><b>Xbox</b><b>Nintendo</b><b>Meta</b></div>
 <section id="worlds" className="store-section"><div className="section-heading"><div><p className="kicker">FIND YOUR WORLD</p><h2>وارد دنیای خودت شو.</h2></div><p>برای هر سلیقه، یک شروع تازه.</p></div><div className="world-grid">{worlds.map(w=><a href="#collection" className={'world-card '+w.kind} key={w.name}><span className="world-name">{w.name}<i>↗</i></span><span className="world-symbol" aria-hidden="true">{w.symbol}</span><h3>{w.fa}</h3><p>{w.desc}</p></a>)}</div></section>
 <section id="collection" className="store-section collection"><div className="section-heading"><div><p className="kicker">THE COLLECTION</p><h2>از اینجا شروع کن.</h2></div><span className="status-pill">کاتالوگ در حال تکمیل</span></div><p className="catalog-note">محصولات فعلی برای بررسی نسخه اولیه هستند. قیمت و امکان خرید پس از تکمیل اطلاعات فعال می‌شود.</p>
 {unavailable ? <div role="status" className="catalog-state"><h3>کاتالوگ موقتاً در دسترس نیست.</h3><p>اطلاعات محصولات بارگذاری نشد. کمی بعد دوباره مراجعه کن.</p></div> : products.length===0 ? <div className="catalog-state"><h3>انتخاب‌های تازه در راه‌اند.</h3><p>کاتالوگ محصولات به‌زودی تکمیل می‌شود.</p></div> : <div className="catalog-grid">{products.map(p=><article className="catalog-card" key={String(p.id)}><div className="product-visual"><span>AV.</span><small>تصویر محصول در حال آماده‌سازی</small></div><div className="product-info"><span className="product-label">AVANTECH COLLECTION</span><h3>{String(p.name)}</h3><p>قیمت و موجودی در حال تکمیل</p><Link href={'/products/'+encodeURIComponent(String(p.id))}>مشاهده جزئیات <span>←</span></Link></div></article>)}</div>}</section>
 <section className="editorial"><p className="kicker">MORE THAN A DEVICE</p><h2>فقط یک دستگاه نیست.<br/>شروع یک تجربه تازه است.</h2><p>آون‌تک را برای کسانی می‌سازیم که به جزئیات اهمیت می‌دهند؛<br/>در انتخاب، در تجربه، در زندگی.</p><a className="primary-action" href="#worlds">دنیای بعدی‌ات را پیدا کن ↙</a><span aria-hidden="true" className="editorial-mark">AV</span></section>
 </main>
}

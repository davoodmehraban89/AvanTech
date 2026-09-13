'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
type Product={id:string;name:string;description:string};
export function normalizeSearch(value:string){return value.normalize('NFKC').replace(/ي/g,'ی').replace(/ك/g,'ک').replace(/[\u064B-\u065F\u0670]/g,'').replace(/\u200c/g,' ').replace(/\s+/g,' ').trim().toLocaleLowerCase('fa');}
export default function Catalog({products}:{products:Product[]}){
 const [query,setQuery]=useState('');const [order,setOrder]=useState('name');
 const shown=useMemo(()=>products.filter(p=>normalizeSearch(p.name+' '+p.description).includes(normalizeSearch(query))).sort((a,b)=>order==='name'?a.name.localeCompare(b.name,'fa'):b.name.localeCompare(a.name,'fa')),[products,query,order]);
 return <section className="store-section" style={{paddingBottom:65}}><p className="kicker">EXPLORE THE COLLECTION</p><h1>انتخاب بعدی تو، اینجاست.</h1><p className="catalog-note">کاتالوگ در حال تکمیل است؛ ثبت سفارش هنوز فعال نیست.</p>
 <form role="search" onSubmit={e=>e.preventDefault()} style={{display:'flex',gap:16,flexWrap:'wrap',alignItems:'end',margin:'25px 0'}}><label style={{flex:'1 1 240px'}}>جست‌وجوی محصول<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="نام یا مشخصات محصول…" style={{display:'block',width:'100%',background:'white'}}/></label><label>ترتیب نمایش<select value={order} onChange={e=>setOrder(e.target.value)} style={{display:'block',padding:12,borderRadius:10,border:'1px solid #bac5bd',background:'white'}}><option value="name">نام: الف تا ی</option><option value="reverse">نام: ی تا الف</option></select></label>{query&&<button type="button" onClick={()=>setQuery('')} style={{padding:10}}>پاک‌کردن جست‌وجو</button>}</form>
 <p role="status" aria-live="polite" className="catalog-note">{new Intl.NumberFormat('fa-IR').format(shown.length)} محصول</p>
 {shown.length?<div className="catalog-grid">{shown.map(p=><article className="catalog-card" key={p.id}><div className="product-visual"><span aria-hidden="true">AV.</span><small>تصویر در حال آماده‌سازی</small></div><div className="product-info"><h2 style={{fontSize:22}}>{p.name}</h2><p>{p.description.slice(0,130)||'مشخصات در حال تکمیل'}</p><Link href={'/products/'+encodeURIComponent(p.id)}>مشاهده جزئیات <span>←</span></Link></div></article>)}</div>:<div className="catalog-state"><h2>{products.length?'محصولی مطابق جست‌وجو پیدا نشد.':'هنوز محصولی ثبت نشده است.'}</h2><p>نام دیگری را امتحان کنید یا بعداً دوباره مراجعه کنید.</p></div>}</section>;
}

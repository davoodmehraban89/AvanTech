'use client';
import { useState } from 'react';
type Media = {id:string;kind:string;external_url:string|null;alt_text:string|null;is_primary:boolean;sort_order:number};
type Variant = {id:string;title:string|null;color:string|null;storage_gb:number|null;region:string|null;edition:string|null;is_active:boolean};
export default function ProductPresentation({media,variants,name}:{media:Media[];variants:Variant[];name:string}){
 const images=media.filter(m=>m.kind==='image' && validUrl(m.external_url)).sort((a,b)=>Number(b.is_primary)-Number(a.is_primary)||a.sort_order-b.sort_order);
 const [selected,setSelected]=useState<string|null>(null);const [failed,setFailed]=useState<string[]>([]);
 const current=images.find(m=>m.id===selected)||images[0];const active=variants.filter(v=>v.is_active);
 return <div><section className="detail-visual" aria-label="گالری محصول">{current&&!failed.includes(current.id)?<img style={{maxHeight:380,objectFit:'contain'}} src={current.external_url!} alt={current.alt_text||name} referrerPolicy="no-referrer" onError={()=>setFailed(old=>[...old,current.id])}/>:<><span aria-hidden="true">AV.</span><p>{current?'تصویر در دسترس نیست':'هنوز تصویری برای این محصول ثبت نشده است'}</p></>}</section>
 {images.length>1&&<div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:12}} aria-label="انتخاب تصویر">{images.map((m,i)=><button type="button" key={m.id} aria-pressed={current?.id===m.id} onClick={()=>setSelected(m.id)} style={{padding:'8px 14px',border:'1px solid #859879',borderRadius:12,background:current?.id===m.id?'#d5f581':'white'}}>تصویر {new Intl.NumberFormat('fa-IR').format(i+1)}</button>)}</div>}
 <section className="detail-notice"><h2>گونه‌های ثبت‌شده</h2>{active.length?active.map(v=><article key={v.id} style={{borderTop:'1px solid #dfe5dd',paddingTop:16,marginTop:16}}><h3>{v.title||'گونه محصول'}</h3><dl>{[['رنگ',v.color],['ظرفیت',v.storage_gb?new Intl.NumberFormat('fa-IR').format(v.storage_gb)+' گیگابایت':null],['منطقه',v.region],['نسخه',v.edition]].filter(([,value])=>value).map(([label,value])=><div key={label} style={{display:'flex',justifyContent:'space-between',gap:12,fontSize:13}}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p>فعال‌بودن گونه به معنی موجودبودن کالا نیست.</p></article>):<p>هنوز گونه فعالی برای نمایش ثبت نشده است.</p>}</section></div>;
}
function validUrl(value:string|null){if(!value)return false;try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}}


'use client';
import { create } from 'zustand';

type CartItem = { id:string; name:string; price:number; image?:string; quantity:number };

type CartState = { items: CartItem[]; add:(item:CartItem)=>void; remove:(id:string)=>void; count:()=>number };

export const useCartStore = create<CartState>((set,get)=>({
 items:[],
 add:(item)=>set(s=>{const old=s.items.find(x=>x.id===item.id);return {items:old?s.items.map(x=>x.id===item.id?{...x,quantity:x.quantity+1}:x):[...s.items,item]}}),
 remove:(id)=>set(s=>({items:s.items.filter(x=>x.id!==id)})),
 count:()=>get().items.reduce((a,b)=>a+b.quantity,0)
}));
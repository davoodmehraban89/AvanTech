import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function Header() {
 const supabase=await createClient();
 const {data:{user}}=await supabase.auth.getUser();
 return <header className="border-b bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between p-4"><div className="text-xl font-bold">AvanTech</div><nav className="hidden gap-6 md:flex"><Link href="/">خانه</Link><Link href="/products">محصولات</Link></nav><div className="flex gap-3"><Link href="/cart">سبد خرید</Link>{user?<Link href="/account">حساب کاربری</Link>:<Link href="/login">ورود</Link>}</div></div></header>
}

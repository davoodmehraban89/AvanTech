import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default function LoginPage(){
 async function login(formData:FormData){'use server'; const email=String(formData.get('email')); const password=String(formData.get('password')); const supabase=await createClient(); const {error}=await supabase.auth.signInWithPassword({email,password}); if(!error) redirect('/');}
 return <main className="mx-auto max-w-md p-6"><h1 className="text-2xl font-bold mb-6">ورود</h1><form action={login} className="space-y-4"><input name="email" type="email" placeholder="ایمیل" className="w-full border p-3 rounded"/><input name="password" type="password" placeholder="رمز عبور" className="w-full border p-3 rounded"/><button className="w-full rounded bg-black p-3 text-white">ورود</button></form></main>
}
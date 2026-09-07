import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default function RegisterPage(){
 async function register(formData:FormData){'use server'; const email=String(formData.get('email')); const password=String(formData.get('password')); const name=String(formData.get('name')); const supabase=await createClient(); const {error}=await supabase.auth.signUp({email,password,options:{data:{full_name:name}}}); if(!error) redirect('/');}
 return <main className="mx-auto max-w-md p-6"><h1 className="text-2xl font-bold mb-6">ثبت نام</h1><form action={register} className="space-y-4"><input name="name" placeholder="نام" className="w-full border p-3 rounded"/><input name="email" type="email" placeholder="ایمیل" className="w-full border p-3 rounded"/><input name="password" type="password" placeholder="رمز عبور" className="w-full border p-3 rounded"/><button className="w-full rounded bg-black p-3 text-white">ثبت نام</button></form></main>
}
import { NextResponse } from 'next/server';
/** No financial writes until authenticated transaction and payment verification are tested. */
export async function POST() {
  return NextResponse.json({ error: 'CHECKOUT_NOT_READY', message: 'ثبت سفارش مالی هنوز آماده نیست. سبد شما حفظ شده و هیچ مبلغی دریافت نشده است.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
}

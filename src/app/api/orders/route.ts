import {NextResponse} from 'next/server';
export async function POST(){return NextResponse.json({error:'checkout_not_configured',message:'پرداخت و ثبت سفارش مالی هنوز فعال نشده است. هیچ مبلغ یا سفارش واقعی ثبت نشد.'},{status:503})}

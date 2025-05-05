// app/api/email-preview/route.ts
import { render } from '@react-email/render';
import { NextResponse } from 'next/server';
import TokenEmail from '@/emails/TokenEmail'; // ajusta o path

export async function GET() {
  const html = await render(<TokenEmail token="DJZ-TLX" />, {
    pretty: true,
  });

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
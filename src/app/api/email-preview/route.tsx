// app/api/email-preview/route.ts
import { render } from '@react-email/render';
import { NextResponse } from 'next/server';
import CredentialsEmail from '@/emails/CredentialsEmail';

export async function GET() {
  const html = await render(<CredentialsEmail companyName='Infy Solutions' username='infy' password='123' />, {
    pretty: true,
  });

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
// app/api/email-preview/route.ts
import InviteEmail from '@/emails/InviteEmail';
import { render } from '@react-email/render';
import { NextResponse } from 'next/server';

export async function GET() {
  const html = await render(<InviteEmail {...InviteEmail.PreviewProps} />, {
    pretty: true,
  });

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
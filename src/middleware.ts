
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_PATHS = [
  '/signin',
  '/signup',
  '/invite'
];

export async function middleware(req: NextRequest) {
  
  const { pathname } = req.nextUrl;
  
  const isPublic = PUBLIC_PATHS.some((path) =>
    pathname === path || pathname.startsWith(path + '/')
  );
  if (isPublic) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  if (!token) {
    const signInUrl = new URL('/signin', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|images|public|lib).*)'],
};
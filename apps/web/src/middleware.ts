import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PROTECTED_ROUTE = [
  '/inquiry/dealer',
  '/inquiry/partnership',
  '/inquiry/advertisement',
  '/inquiry/misc',
];

const LOGIN_PROTECTED_ROUTE = ['/auth'];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const session = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  });

  if (PROTECTED_ROUTE.includes(req.nextUrl.pathname))
    if (!session) {
      url.pathname = '/auth/signin';
      return NextResponse.redirect(url);
    }

  if (LOGIN_PROTECTED_ROUTE.includes(req.nextUrl.pathname))
    if (session) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

  return null;
}

export const config = {
  matcher: ['/community/create', '/auth/:path*', '/inquiry/:path*'],
};

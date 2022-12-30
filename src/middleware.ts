import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname.startsWith('/auth')) {
    const session = await getToken({
      req,
      secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    });

    if (session) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)', '/account/:path*'],
};

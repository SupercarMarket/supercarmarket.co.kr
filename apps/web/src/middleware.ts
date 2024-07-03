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

const RATE_LIMIT_WINDOW = 1000; // 1초
const MAX_REQUESTS = 2; // 초당 최대 2개의 요청
const blockedIPs: Record<string, number> = {};

const rateLimitStore: Record<string, { count: number; timestamp: number }> = {};

async function rateLimiter(req: NextRequest) {
  let ip = req.headers.get('x-forwarded-for');
  if (!ip) {
    ip =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-real-ip') ||
      req.headers.get('fastly-client-ip') ||
      req.headers.get('True-Client-IP') ||
      req.headers.get('x-client-ip') ||
      req.headers.get('x-cluster-client-ip') ||
      req.ip ||
      'unknown';
  }

  if (blockedIPs[ip]) {
    const currentTime = Date.now();
    if (currentTime - blockedIPs[ip] > 24 * 60 * 60 * 1000) {
      delete blockedIPs[ip];
    } else {
      return NextResponse.json(
        {
          error: 'Your IP has been temporarily blocked due to excessive requests.',
        },
        {
          status: 403,
        }
      );
    }
  }

  const currentTime = Date.now();
  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = { count: 1, timestamp: currentTime };
  } else {
    rateLimitStore[ip].count++;
    if (currentTime - rateLimitStore[ip].timestamp > RATE_LIMIT_WINDOW) {
      rateLimitStore[ip] = { count: 1, timestamp: currentTime };
    }
  }

  if (rateLimitStore[ip].count > MAX_REQUESTS) {
    blockedIPs[ip] = currentTime;
    return NextResponse.json(
      {
        error: 'Too many requests, please try again later.',
      },
      {
        status: 429,
      }
    );
  }
  return null;
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const session = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  });

  const rateLimitResponse = await rateLimiter(req);
  if (rateLimitResponse) return rateLimitResponse;

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

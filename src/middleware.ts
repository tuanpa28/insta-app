import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { decodeAccessToken } from './utils';

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const path = nextUrl.pathname;

  const currentUser = decodeAccessToken();

  if (!currentUser && !path.startsWith('/login')) {
    return NextResponse.rewrite(new URL('/login', request.url));
  }

  if (currentUser && !path.startsWith('/')) {
    return Response.redirect(new URL('/', request.url));
  }

  if (currentUser?.isAdmin && !path.startsWith('/dashboard')) {
    return Response.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};

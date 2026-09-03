import createMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware({
  ...routing,
  alternateLinks: false
});

export default function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.endsWith('/health')) return intlMiddleware(request);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-wheelmates-layout-probe', request.nextUrl.searchParams.get('probe') ?? 'full');
  return intlMiddleware(new NextRequest(request.url, {headers: requestHeaders}));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|_vercel|.*\\..*).*)']
};

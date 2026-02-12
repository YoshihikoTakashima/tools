import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/lib/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/', '/(ja|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};

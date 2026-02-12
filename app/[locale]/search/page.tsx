import { setRequestLocale } from 'next-intl/server';
import SearchPage from '@/src/components/SearchPage';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  setRequestLocale(locale);

  const query = q?.toLowerCase() || '';

  return <SearchPage query={query} />;
}

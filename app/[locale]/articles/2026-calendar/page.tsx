import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Calendar2026Article from '@/src/components/articles/Calendar2026Article';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'ja') {
    return {
      title: '2026年カレンダー完全ガイド｜祝日・連休・営業日・六曜を徹底解説',
      description: '2026年の祝日一覧、連休情報、営業日数、六曜カレンダーを完全網羅。ゴールデンウィークやシルバーウィークの日程、月別の営業日数も詳しく解説します。',
    };
  }

  return {
    title: '2026 Calendar Complete Guide | Holidays, Business Days, and Rokuyō',
    description: 'Complete guide to 2026 Japanese holidays, long weekends, business days count, and rokuyō calendar. Detailed monthly breakdown and planning information.',
  };
}

export default async function Calendar2026ArticlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Calendar2026Article locale={locale} />;
}

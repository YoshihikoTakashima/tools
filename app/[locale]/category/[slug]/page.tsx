import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { categories } from '@/src/data/categories';
import CategoryPage from '@/src/components/CategoryPage';

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  return <CategoryPage categorySlug={slug} categoryIcon={category.icon} />;
}

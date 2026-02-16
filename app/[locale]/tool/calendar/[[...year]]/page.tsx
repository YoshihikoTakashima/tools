import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { tools } from '@/src/data/tools';
import { categories } from '@/src/data/categories';
import { articles } from '@/src/data/articles';
import { getAvailableYears } from '@/src/data/holidays';
import Breadcrumb from '@/src/components/Breadcrumb';
import CalendarView from '@/src/components/tools/CalendarView';
import ArticleList from '@/src/components/ArticleList';

export const runtime = 'edge';

export function generateStaticParams() {
  // Auto-detect years from holiday data
  const years = getAvailableYears();
  return [
    { year: [] }, // /calendar (current year)
    ...years.map((year) => ({ year: [year.toString()] })), // /calendar/2024, /calendar/2025, etc.
  ];
}

export default async function CalendarPage({
  params,
}: {
  params: Promise<{ locale: string; year?: string[] }>;
}) {
  const { locale, year: yearParam } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const tool = tools.find((t) => t.slug === 'calendar');
  if (!tool) {
    notFound();
  }

  const category = categories.find((c) => c.slug === tool.categorySlug);
  if (!category) {
    notFound();
  }

  // Determine the year to display
  const currentYear = new Date().getFullYear();
  const availableYears = getAvailableYears();
  let displayYear = currentYear;

  if (yearParam && yearParam.length > 0) {
    const parsedYear = parseInt(yearParam[0], 10);
    if (isNaN(parsedYear) || !availableYears.includes(parsedYear)) {
      notFound();
    }
    displayYear = parsedYear;
  }

  const toolArticles = articles
    .filter((article) => article.toolSlugs.includes('calendar'))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        <Breadcrumb
          items={[
            {
              label: t(`categories.${tool.categorySlug}.name`),
              href: `/${locale}/category/${tool.categorySlug}`
            },
            { label: t(`tools.calendar.name`) }
          ]}
          locale={locale}
        />
      </div>
      <CalendarView initialYear={displayYear} locale={locale} />
      {toolArticles.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ArticleList
            articles={toolArticles}
            locale={locale}
          />
        </div>
      )}
    </div>
  );
}

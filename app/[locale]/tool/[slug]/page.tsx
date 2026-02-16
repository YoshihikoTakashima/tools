import { notFound, redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { tools } from '@/src/data/tools';
import { categories } from '@/src/data/categories';
import { articles } from '@/src/data/articles';
import Breadcrumb from '@/src/components/Breadcrumb';
import ArticleList from '@/src/components/ArticleList';

// Tool components
import TaxCalculator from '@/src/components/tools/TaxCalculator';
import DiscountCalculator from '@/src/components/tools/DiscountCalculator';
import AgeCalculator from '@/src/components/tools/AgeCalculator';
import HistoryCalculator from '@/src/components/tools/HistoryCalculator';
import DateDiff from '@/src/components/tools/DateDiff';
import TextCounter from '@/src/components/tools/TextCounter';
import RemoveLineBreaks from '@/src/components/tools/RemoveLineBreaks';
import ZenkakuHankaku from '@/src/components/tools/ZenkakuHankaku';
import JsonFormatter from '@/src/components/tools/JsonFormatter';
import Csv2Json from '@/src/components/tools/Csv2Json';
import Base64Converter from '@/src/components/tools/Base64Converter';
import UuidGenerator from '@/src/components/tools/UuidGenerator';

const toolComponents: Record<string, React.ComponentType> = {
  'tax-calculator': TaxCalculator,
  'discount-calculator': DiscountCalculator,
  'age-calculator': AgeCalculator,
  'history-calculator': HistoryCalculator,
  'date-diff': DateDiff,
  'text-counter': TextCounter,
  'remove-line-breaks': RemoveLineBreaks,
  'zenkaku-hankaku': ZenkakuHankaku,
  'json-formatter': JsonFormatter,
  'csv2json': Csv2Json,
  'base64': Base64Converter,
  'uuid-generator': UuidGenerator,
};

export function generateStaticParams() {
  return tools
    .filter((tool) => tool.slug !== 'calendar') // Calendar has its own route
    .map((tool) => ({
      slug: tool.slug,
    }));
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  // Redirect calendar to its own route
  if (slug === 'calendar') {
    redirect(`/${locale}/tool/calendar`);
  }

  const tool = tools.find((t) => t.slug === slug);
  if (!tool) {
    notFound();
  }

  const category = categories.find((c) => c.slug === tool.categorySlug);
  if (!category) {
    notFound();
  }

  const ToolComponent = toolComponents[slug];
  if (!ToolComponent) {
    notFound();
  }

  const toolArticles = articles
    .filter((article) => article.toolSlugs.includes(slug))
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
            { label: t(`tools.${slug}.name`) }
          ]}
          locale={locale}
        />
      </div>
      <ToolComponent />
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

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Article } from '@/src/data/articles';

interface ArticleListProps {
  articles: Article[];
  locale: string;
  limit?: number;
}

export default function ArticleList({ articles, locale, limit }: ArticleListProps) {
  const t = useTranslations();

  const displayArticles = limit ? articles.slice(0, limit) : articles;

  if (displayArticles.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {t('articles.title')}
      </h2>
      <div className="space-y-4">
        {displayArticles.map((article) => (
          <Link
            key={article.id}
            href={`/${locale}/articles/${article.slug}`}
            className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t(`articles.${article.slug}.title`)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {t(`articles.${article.slug}.description`)}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
              <span>{new Date(article.createdAt).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US')}</span>
              <span>•</span>
              <span>{t(`categories.${article.categorySlug}.name`)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

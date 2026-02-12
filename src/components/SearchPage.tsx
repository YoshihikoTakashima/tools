'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { Grid, List } from 'lucide-react';
import Breadcrumb from './Breadcrumb';
import { tools } from '@/src/data/tools';

interface SearchPageProps {
  query: string;
}

export default function SearchPage({ query }: SearchPageProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const results = query
    ? tools.filter((tool) => {
        const nameMatch = t(`tools.${tool.slug}.name`).toLowerCase().includes(query);
        const descMatch = t(`tools.${tool.slug}.description`).toLowerCase().includes(query);
        const keywordMatch = tool.keywords.some((kw: string) => kw.toLowerCase().includes(query));
        return nameMatch || descMatch || keywordMatch;
      })
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8">
      <Breadcrumb
        items={[
          { label: t('breadcrumb.search') }
        ]}
        locale={locale}
      />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {t('search.title')}
      </h1>
      {query && (
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {t('search.query')}: <span className="font-semibold">{query}</span>
        </p>
      )}

      {query && results.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('search.resultsCount', { count: results.length })}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'
              : 'flex flex-col gap-3'
          }>
            {results.map((tool) => (
              <Link
                key={tool.id}
                href={`/${locale}/tool/${tool.slug}`}
                className="p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
                  {t(`tools.${tool.slug}.name`)}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {t(`tools.${tool.slug}.description`)}
                </p>
              </Link>
            ))}
          </div>
        </>
      )}

      {query && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">{t('search.noResults')}</p>
        </div>
      )}
    </div>
  );
}

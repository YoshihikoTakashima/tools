'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { Grid, List } from 'lucide-react';
import { categories } from '@/src/data/categories';
import CategoryIcon from './CategoryIcon';
import { tools } from '@/src/data/tools';

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('site.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t('site.tagline')}
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          カテゴリ
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${locale}/category/${category.slug}`}
              className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="mb-2 sm:mb-3">
                <CategoryIcon slug={category.slug} className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                {t(`categories.${category.slug}.name`)}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {t(`categories.${category.slug}.description`)}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            全てのツール
          </h2>
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
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={`/${locale}/tool/${tool.slug}`}
              className={`p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg border transition-colors relative ${
                tool.isRecommended
                  ? 'border-blue-500 dark:border-blue-500 shadow-md'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500'
              }`}
            >
              {tool.isRecommended && (
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                  おすすめ
                </span>
              )}
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
                {t(`tools.${tool.slug}.name`)}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {t(`tools.${tool.slug}.description`)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

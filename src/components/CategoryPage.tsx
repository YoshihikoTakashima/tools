'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { Grid, List } from 'lucide-react';
import Breadcrumb from './Breadcrumb';
import { tools } from '@/src/data/tools';
import { articles } from '@/src/data/articles';
import CategoryIcon from './CategoryIcon';
import ArticleList from './ArticleList';

interface CategoryPageProps {
  categorySlug: string;
}

export default function CategoryPage({ categorySlug }: CategoryPageProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categoryTools = tools.filter((tool) => tool.categorySlug === categorySlug);
  const categoryArticles = articles
    .filter((article) => article.categorySlug === categorySlug)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8">
      <Breadcrumb
        items={[
          { label: t(`categories.${categorySlug}.name`) }
        ]}
        locale={locale}
      />

      <div className="mb-8">
        <div className="mb-4">
          <CategoryIcon slug={categorySlug} className="w-12 h-12 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t(`categories.${categorySlug}.name`)}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t(`categories.${categorySlug}.description`)}
        </p>
      </div>

      <div className="flex justify-end gap-2 mb-4">
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

      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'
          : 'flex flex-col gap-3'
      }>
        {categoryTools.map((tool) => (
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

      {categoryArticles.length > 0 && (
        <div className="mt-8">
          <ArticleList
            articles={categoryArticles}
            locale={locale}
            limit={5}
          />
        </div>
      )}
    </div>
  );
}

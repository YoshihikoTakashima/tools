'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  headerExtra?: ReactNode;
}

export default function ToolLayout({ title, description, children, headerExtra }: ToolLayoutProps) {
  const t = useTranslations('common');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div className="mb-6">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          {headerExtra}
        </div>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {children}
      </div>
    </div>
  );
}

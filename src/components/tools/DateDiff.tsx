'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../ToolLayout';

export default function DateDiff() {
  const t = useTranslations('tools.date-diff');
  const tc = useTranslations('common');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState<number | null>(null);

  const calculate = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setDays(diffDays);
  };

  const handleExample = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(nextWeek.toISOString().split('T')[0]);
  };

  return (
    <ToolLayout title={t('name')} description={t('description')}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('startDate')}
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('endDate')}
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={calculate}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium"
          >
            {tc('calculate')}
          </button>
          <button
            onClick={() => { setStartDate(''); setEndDate(''); setDays(null); }}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded font-medium"
          >
            {tc('clear')}
          </button>
          <button
            onClick={handleExample}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium"
          >
            {tc('example')}
          </button>
        </div>

        {days !== null && (
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('difference')}</div>
            <div className="text-4xl font-bold text-gray-900 dark:text-white">
              {days} {t('daysCount')}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

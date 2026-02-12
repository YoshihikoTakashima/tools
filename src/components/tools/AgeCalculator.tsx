'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../ToolLayout';

export default function AgeCalculator() {
  const t = useTranslations('tools.age-calculator');
  const tc = useTranslations('common');

  const [birthdate, setBirthdate] = useState('');
  const [result, setResult] = useState<{ years: number; days: number; totalDays: number; nextBirthday: number } | null>(null);

  const calculate = () => {
    if (!birthdate) return;

    const birth = new Date(birthdate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      years--;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      days: totalDays % 365,
      totalDays,
      nextBirthday: daysUntilBirthday,
    });
  };

  const handleExample = () => {
    setBirthdate('1990-01-01');
  };

  return (
    <ToolLayout title={t('name')} description={t('description')}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('birthdate')}
          </label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
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
            onClick={() => { setBirthdate(''); setResult(null); }}
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

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('age')}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {result.years} {t('years')}
              </div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('totalDays')}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {result.totalDays} {t('days')}
              </div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg col-span-1 md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('nextBirthday')}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {result.nextBirthday} {t('daysUntilBirthday')}
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

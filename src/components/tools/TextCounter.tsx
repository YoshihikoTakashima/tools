'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../ToolLayout';

export default function TextCounter() {
  const t = useTranslations('tools.text-counter');
  const tc = useTranslations('common');

  const [text, setText] = useState('');

  const count = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    lines: text.split('\n').length,
    bytes: new Blob([text]).size,
  };

  const handleExample = () => {
    setText('サンプルテキスト\nThis is a sample text.\n文字数をカウントします。');
  };

  return (
    <ToolLayout title={t('name')} description={t('description')}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('text')}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder={t('text')}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('characters')}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{count.characters}</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('charactersNoSpaces')}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{count.charactersNoSpaces}</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('lines')}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{count.lines}</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('bytes')}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{count.bytes}</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setText('')}
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
      </div>
    </ToolLayout>
  );
}

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../ToolLayout';
import CopyButton from '../CopyButton';
import ToolInfoArticle from '../ToolInfoArticle';

export default function UuidGenerator() {
  const t = useTranslations('tools.uuid-generator');
  const tc = useTranslations('common');

  const [count, setCount] = useState('1');
  const [uuids, setUuids] = useState<string[]>([]);

  const generateUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const num = Math.min(Math.max(parseInt(count) || 1, 1), 20);
    const newUuids = Array.from({ length: num }, () => generateUuid());
    setUuids(newUuids);
  };

  return (
    <ToolLayout
      title={t('name')}
      description={t('description')}
      headerExtra={
        <ToolInfoArticle
          buttonLabel={t('infoButtonLabel')}
          articleTitle={t('article.title')}
          sections={[
            {
              title: t('article.section1.title'),
              content: t('article.section1.content'),
            },
            {
              title: t('article.section2.title'),
              content: t('article.section2.content'),
            },
            {
              title: t('article.section3.title'),
              content: t('article.section3.content'),
              example: '550e8400-e29b-41d4-a716-446655440000',
              note: t('article.section3.note'),
            },
            {
              title: t('article.section4.title'),
              content: '',
              list: [
                t('article.section4.use1'),
                t('article.section4.use2'),
                t('article.section4.use3'),
                t('article.section4.use4'),
              ],
            },
            {
              title: t('article.section5.title'),
              content: t('article.section5.content'),
            },
            {
              title: t('article.section6.title'),
              content: t('article.section6.content'),
            },
          ]}
        />
      }
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('count')} (1-20)
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGenerate}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium"
          >
            {tc('generate')}
          </button>
          <button
            onClick={() => setUuids([])}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded font-medium"
          >
            {tc('clear')}
          </button>
        </div>

        {uuids.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('uuids')}
              </label>
              <CopyButton text={uuids.join('\n')} />
            </div>
            <textarea
              value={uuids.join('\n')}
              readOnly
              rows={Math.min(uuids.length, 10)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

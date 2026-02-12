'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../ToolLayout';
import CopyButton from '../CopyButton';

export default function RemoveLineBreaks() {
  const t = useTranslations('tools.remove-line-breaks');
  const tc = useTranslations('common');

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [replaceWith, setReplaceWith] = useState<'space' | 'remove'>('space');

  const convert = () => {
    const result = replaceWith === 'space'
      ? input.replace(/\n/g, ' ')
      : input.replace(/\n/g, '');
    setOutput(result);
  };

  const handleExample = () => {
    setInput('これは\nサンプル\nテキスト\nです。');
  };

  return (
    <ToolLayout title={t('name')} description={t('description')}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {tc('input')}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('replaceWith')}
          </label>
          <select
            value={replaceWith}
            onChange={(e) => setReplaceWith(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="space">{t('space')}</option>
            <option value="remove">{t('remove')}</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={convert}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium"
          >
            {tc('convert')}
          </button>
          <button
            onClick={() => { setInput(''); setOutput(''); }}
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

        {output && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {tc('output')}
              </label>
              <CopyButton text={output} />
            </div>
            <textarea
              value={output}
              readOnly
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

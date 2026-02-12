'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../ToolLayout';
import CopyButton from '../CopyButton';

export default function JsonFormatter() {
  const t = useTranslations('tools.json-formatter');
  const tc = useTranslations('common');

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handlePrettify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (err) {
      setError(t('invalidJson'));
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (err) {
      setError(t('invalidJson'));
      setOutput('');
    }
  };

  const handleExample = () => {
    setInput('{"name":"John","age":30,"city":"Tokyo","hobbies":["reading","coding"]}');
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
            placeholder="JSON"
          />
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handlePrettify}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium"
          >
            {t('prettify')}
          </button>
          <button
            onClick={handleMinify}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium"
          >
            {t('minify')}
          </button>
          <button
            onClick={() => { setInput(''); setOutput(''); setError(''); }}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded font-medium"
          >
            {tc('clear')}
          </button>
          <button
            onClick={handleExample}
            className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded font-medium"
          >
            {tc('example')}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

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
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

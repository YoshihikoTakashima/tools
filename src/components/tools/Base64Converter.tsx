'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUpDown } from 'lucide-react';
import ToolLayout from '../ToolLayout';
import CopyButton from '../CopyButton';

export default function Base64Converter() {
  const t = useTranslations('tools.base64');
  const tc = useTranslations('common');

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      setError('');
    } catch (err) {
      setError(tc('error'));
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      setError('');
    } catch (err) {
      setError(t('invalidBase64'));
      setOutput('');
    }
  };

  const handleExample = () => {
    setInput('Hello, World! こんにちは');
  };

  const handleSwap = () => {
    const temp = input;
    setInput(output);
    setOutput(temp);
    setError('');
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
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
          />
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleEncode}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium"
          >
            {t('encode')}
          </button>
          <button
            onClick={handleDecode}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium"
          >
            {t('decode')}
          </button>
          <button
            onClick={handleSwap}
            disabled={!input && !output}
            className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            title={tc('swap') || '入力と出力を入れ替え'}
          >
            <ArrowUpDown className="w-5 h-5" />
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
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

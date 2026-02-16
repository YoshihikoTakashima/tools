'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../ToolLayout';
import ToolInfoArticle from '../ToolInfoArticle';

export default function Csv2Json() {
  const t = useTranslations('tools.csv2json');
  const tc = useTranslations('common');

  const [csvInput, setCsvInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(true);
  const [error, setError] = useState('');

  const parseCsv = (csv: string, delimiter: string, hasHeader: boolean) => {
    try {
      const lines = csv.trim().split('\n');
      if (lines.length === 0) {
        throw new Error('CSV is empty');
      }

      const parseRow = (row: string): string[] => {
        const result: string[] = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < row.length; i++) {
          const char = row[i];
          const nextChar = row[i + 1];

          if (char === '"') {
            if (inQuotes && nextChar === '"') {
              current += '"';
              i++;
            } else {
              inQuotes = !inQuotes;
            }
          } else if (char === delimiter && !inQuotes) {
            result.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        result.push(current.trim());
        return result;
      };

      let headers: string[];
      let dataStartIndex: number;

      if (hasHeader) {
        headers = parseRow(lines[0]);
        dataStartIndex = 1;
      } else {
        const firstRow = parseRow(lines[0]);
        headers = firstRow.map((_, index) => `column${index + 1}`);
        dataStartIndex = 0;
      }

      const data = [];
      for (let i = dataStartIndex; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;

        const values = parseRow(lines[i]);
        const obj: Record<string, string> = {};

        headers.forEach((header, index) => {
          obj[header] = values[index] || '';
        });

        data.push(obj);
      }

      return JSON.stringify(data, null, 2);
    } catch (err) {
      throw new Error(`Parse error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleConvert = () => {
    try {
      setError('');
      const result = parseCsv(csvInput, delimiter, hasHeader);
      setJsonOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      setJsonOutput('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setCsvInput(text);
      };
      reader.readAsText(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setCsvInput('');
    setJsonOutput('');
    setError('');
  };

  const handleSample = () => {
    const sample = `name,age,city
John Doe,30,New York
Jane Smith,25,Los Angeles
Bob Johnson,35,Chicago`;
    setCsvInput(sample);
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
              content: '',
              list: [
                t('article.section2.feature1'),
                t('article.section2.feature2'),
                t('article.section2.feature3'),
                t('article.section2.feature4'),
                t('article.section2.feature5'),
              ],
            },
            {
              title: t('article.section3.title'),
              content: '',
              list: [
                t('article.section3.use1'),
                t('article.section3.use2'),
                t('article.section3.use3'),
                t('article.section3.use4'),
              ],
            },
            {
              title: t('article.section4.title'),
              content: t('article.section4.content'),
            },
          ]}
        />
      }
    >
      <div className="space-y-6">
        {/* Options */}
        <div className="flex flex-wrap gap-4 items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('delimiter')}:
            </label>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value=",">{t('comma')}</option>
              <option value=";">{t('semicolon')}</option>
              <option value="\t">{t('tab')}</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="hasHeader"
              checked={hasHeader}
              onChange={(e) => setHasHeader(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="hasHeader" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('hasHeader')}
            </label>
          </div>
        </div>

        {/* File Upload */}
        <div className="flex gap-2">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="flex-1 text-sm text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded cursor-pointer bg-gray-50 dark:bg-gray-700"
          />
          <button
            onClick={handleSample}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded font-medium transition-colors"
          >
            {tc('example')}
          </button>
        </div>

        {/* CSV Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('csvInput')}
          </label>
          <textarea
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t('placeholder')}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleConvert}
            disabled={!csvInput}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded font-medium transition-colors"
          >
            {tc('convert')}
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded font-medium transition-colors"
          >
            {tc('clear')}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* JSON Output */}
        {jsonOutput && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('jsonOutput')}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm font-medium transition-colors"
                >
                  {tc('copy')}
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm font-medium transition-colors"
                >
                  {t('download')}
                </button>
              </div>
            </div>
            <textarea
              value={jsonOutput}
              readOnly
              className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

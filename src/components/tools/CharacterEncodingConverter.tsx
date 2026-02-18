'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../ToolLayout';
import ToolInfoArticle from '../ToolInfoArticle';
import type { Encoding as LibEncoding } from 'encoding-japanese';

type EncodingType = 'UTF8' | 'SJIS' | 'EUCJP' | 'JIS' | 'UTF16' | 'UTF16BE' | 'UTF16LE' | 'UNICODE';

const ENCODINGS: { value: EncodingType; label: string }[] = [
  { value: 'UTF8', label: 'UTF-8' },
  { value: 'SJIS', label: 'Shift_JIS' },
  { value: 'EUCJP', label: 'EUC-JP' },
  { value: 'JIS', label: 'ISO-2022-JP (JIS)' },
  { value: 'UTF16', label: 'UTF-16' },
  { value: 'UTF16BE', label: 'UTF-16 BE' },
  { value: 'UTF16LE', label: 'UTF-16 LE' },
];

const ALL_ENCODINGS: { value: EncodingType; label: string }[] = [
  ...ENCODINGS,
  { value: 'UNICODE', label: 'Unicode' },
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function CharacterEncodingConverter() {
  const t = useTranslations('tools.encoding-converter');
  const tc = useTranslations('common');

  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<Uint8Array | null>(null);
  const [detectedEncoding, setDetectedEncoding] = useState<string | null>(null);
  const [sourceEncoding, setSourceEncoding] = useState<EncodingType>('UTF8');
  const [targetEncoding, setTargetEncoding] = useState<EncodingType>('UTF8');
  const [manualSource, setManualSource] = useState(false);
  const [preview, setPreview] = useState('');
  const [convertedPreview, setConvertedPreview] = useState('');
  const [convertedData, setConvertedData] = useState<number[] | null>(null);
  const [error, setError] = useState('');
  const [isConverted, setIsConverted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError('');
    setIsConverted(false);
    setConvertedData(null);
    setConvertedPreview('');

    if (selectedFile.size === 0) {
      setError(t('emptyFile'));
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError(t('fileTooLarge'));
      return;
    }

    setIsProcessing(true);

    try {
      const Encoding = (await import('encoding-japanese')).default;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const arrayBuffer = event.target?.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);

          const detected = Encoding.detect(uint8Array);
          const detectedStr = detected ? String(detected) : '';

          if (!detected || detectedStr === 'BINARY') {
            setDetectedEncoding(detectedStr || null);
            setError(detectedStr === 'BINARY' ? t('binaryFile') : t('detectionFailed'));
            setManualSource(true);
            setFileData(uint8Array);
            setFile(selectedFile);
            setPreview('');
            setIsProcessing(false);
            return;
          }

          setDetectedEncoding(detectedStr);
          setSourceEncoding(detectedStr as EncodingType);
          setManualSource(false);

          // Generate preview
          try {
            const unicodeArray = Encoding.convert(uint8Array, {
              to: 'UNICODE',
              from: detectedStr as LibEncoding,
            });
            const previewText = Encoding.codeToString(unicodeArray);
            setPreview(previewText.slice(0, 2000));
          } catch {
            setPreview('');
          }

          setFileData(uint8Array);
          setFile(selectedFile);

          // Default target to UTF-8 unless file is already UTF-8
          if (detectedStr === 'UTF8') {
            setTargetEncoding('SJIS');
          } else {
            setTargetEncoding('UTF8');
          }
        } catch {
          setError(t('detectionFailed'));
          setManualSource(true);
        }
        setIsProcessing(false);
      };
      reader.onerror = () => {
        setError(t('detectionFailed'));
        setIsProcessing(false);
      };
      reader.readAsArrayBuffer(selectedFile);
    } catch {
      setError(t('detectionFailed'));
      setIsProcessing(false);
    }
  };

  const handleConvert = async () => {
    if (!fileData) return;

    const effectiveSource = manualSource ? sourceEncoding : (detectedEncoding as EncodingType);
    if (effectiveSource === targetEncoding) {
      setError(t('sameEncoding'));
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const Encoding = (await import('encoding-japanese')).default;

      const converted = Encoding.convert(fileData, {
        to: targetEncoding as LibEncoding,
        from: effectiveSource as LibEncoding,
      });

      setConvertedData(converted);

      // Generate converted preview
      try {
        const previewArray = Encoding.convert(converted, {
          to: 'UNICODE',
          from: targetEncoding as LibEncoding,
        });
        setConvertedPreview(Encoding.codeToString(previewArray).slice(0, 2000));
      } catch {
        setConvertedPreview('');
      }

      setIsConverted(true);
    } catch {
      setError(t('conversionFailed'));
    }
    setIsProcessing(false);
  };

  const handleDownload = () => {
    if (!convertedData || !file) return;

    const uint8 = new Uint8Array(convertedData);
    const blob = new Blob([uint8], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    const nameParts = file.name.split('.');
    const ext = nameParts.length > 1 ? '.' + nameParts.pop() : '';
    const baseName = nameParts.join('.');
    const encodingLabel = ENCODINGS.find(e => e.value === targetEncoding)?.label || targetEncoding;
    a.download = `${baseName}_${encodingLabel}${ext}`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setFile(null);
    setFileData(null);
    setDetectedEncoding(null);
    setSourceEncoding('UTF8');
    setTargetEncoding('UTF8');
    setManualSource(false);
    setPreview('');
    setConvertedPreview('');
    setConvertedData(null);
    setError('');
    setIsConverted(false);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getEncodingLabel = (encoding: string): string => {
    const found = ALL_ENCODINGS.find(e => e.value === encoding);
    return found ? found.label : encoding;
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
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('uploadFile')}
          </label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="w-full text-sm text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded cursor-pointer bg-gray-50 dark:bg-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-900/30 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50"
          />
        </div>

        {/* File Info & Detected Encoding */}
        {file && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">{t('fileName')}:</span>{' '}
                <span className="font-medium text-gray-900 dark:text-white">{file.name}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">{t('fileSize')}:</span>{' '}
                <span className="font-medium text-gray-900 dark:text-white">{formatFileSize(file.size)}</span>
              </div>
            </div>
            {detectedEncoding && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400">{t('detectedEncoding')}:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  {getEncodingLabel(detectedEncoding)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Manual Source Encoding Override */}
        {file && (manualSource || detectedEncoding) && (
          <div className="space-y-3">
            {!manualSource && (
              <button
                onClick={() => setManualSource(true)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t('overrideEncoding')}
              </button>
            )}
            {manualSource && (
              <div className="flex items-end gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('sourceEncoding')}
                  </label>
                  <select
                    value={sourceEncoding}
                    onChange={(e) => setSourceEncoding(e.target.value as EncodingType)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  >
                    {ENCODINGS.map((enc) => (
                      <option key={enc.value} value={enc.value}>{enc.label}</option>
                    ))}
                  </select>
                </div>
                {detectedEncoding && detectedEncoding !== 'BINARY' && (
                  <button
                    onClick={() => {
                      setManualSource(false);
                      setSourceEncoding(detectedEncoding as EncodingType);
                    }}
                    className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Preview */}
        {preview && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('preview')}
            </label>
            <textarea
              value={preview}
              readOnly
              className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
            />
          </div>
        )}

        {/* Target Encoding & Actions */}
        {fileData && (
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('targetEncoding')}
              </label>
              <select
                value={targetEncoding}
                onChange={(e) => {
                  setTargetEncoding(e.target.value as EncodingType);
                  setIsConverted(false);
                  setConvertedData(null);
                  setConvertedPreview('');
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                {ENCODINGS.map((enc) => (
                  <option key={enc.value} value={enc.value}>{enc.label}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleConvert}
                disabled={isProcessing}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded font-medium transition-colors"
              >
                {isProcessing ? '...' : t('convertAndDownload')}
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded font-medium transition-colors"
              >
                {tc('clear')}
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Conversion Result */}
        {isConverted && convertedData && (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-700 dark:text-green-400 font-medium text-sm">
                {t('conversionComplete')}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-sm text-gray-600 dark:text-gray-300">
                <span>{t('originalSize')}: {formatFileSize(fileData!.length)}</span>
                <span>{t('convertedSize')}: {formatFileSize(convertedData.length)}</span>
              </div>
            </div>

            {/* Converted Preview */}
            {convertedPreview && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('convertedPreview')}
                </label>
                <textarea
                  value={convertedPreview}
                  readOnly
                  className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
                />
              </div>
            )}

            <button
              onClick={handleDownload}
              className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded font-medium transition-colors"
            >
              {t('download')}
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

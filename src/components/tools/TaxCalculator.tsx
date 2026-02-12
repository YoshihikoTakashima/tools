'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../ToolLayout';

const formatNumber = (num: number): string => {
  return num.toLocaleString('ja-JP');
};

const parseNumber = (str: string): number => {
  return parseFloat(str.replace(/,/g, ''));
};

export default function TaxCalculator() {
  const t = useTranslations('tools.tax-calculator');
  const tc = useTranslations('common');

  const [taxRate, setTaxRate] = useState('10');
  const [amount, setAmount] = useState('');
  const [roundingMethod, setRoundingMethod] = useState<'round' | 'floor' | 'ceil'>('round');
  const [priceExcludingTax, setPriceExcludingTax] = useState('');
  const [priceIncludingTax, setPriceIncludingTax] = useState('');

  useEffect(() => {
    if (!amount || amount === '') {
      setPriceExcludingTax('');
      setPriceIncludingTax('');
      return;
    }

    const inputAmount = parseNumber(amount);
    if (isNaN(inputAmount) || inputAmount <= 0) {
      setPriceExcludingTax('');
      setPriceIncludingTax('');
      return;
    }

    const rate = parseFloat(taxRate) / 100;

    // 入力値を税込み価格と仮定して税抜き価格を計算
    const excludingTaxCalc = inputAmount / (1 + rate);
    const roundedExcludingTax = roundingMethod === 'round' ? Math.round(excludingTaxCalc) :
                                 roundingMethod === 'floor' ? Math.floor(excludingTaxCalc) :
                                 Math.ceil(excludingTaxCalc);

    // 入力値を税抜き価格と仮定して税込み価格を計算
    const tax = inputAmount * rate;
    const roundedTax = roundingMethod === 'round' ? Math.round(tax) :
                       roundingMethod === 'floor' ? Math.floor(tax) :
                       Math.ceil(tax);
    const includingTax = inputAmount + roundedTax;

    setPriceExcludingTax(formatNumber(roundedExcludingTax));
    setPriceIncludingTax(formatNumber(includingTax));
  }, [amount, taxRate, roundingMethod]);

  const handleClear = () => {
    setAmount('');
    setPriceExcludingTax('');
    setPriceIncludingTax('');
  };

  return (
    <ToolLayout title={t('name')} description={t('description')}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('taxRate')}
          </label>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('roundingMethod')}
          </label>
          <select
            value={roundingMethod}
            onChange={(e) => setRoundingMethod(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="round">{t('round')}</option>
            <option value="floor">{t('floor')}</option>
            <option value="ceil">{t('ceil')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            金額
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1000"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
          />
        </div>

        {priceExcludingTax && priceIncludingTax && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {t('priceExcludingTax')}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ¥{priceExcludingTax}
              </div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {t('priceIncludingTax')}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ¥{priceIncludingTax}
              </div>
            </div>
          </div>
        )}

        <div>
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded font-medium"
          >
            {tc('clear')}
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}

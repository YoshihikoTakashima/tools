'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../ToolLayout';
import ToolInfoArticle from '../ToolInfoArticle';

export default function DiscountCalculator() {
  const t = useTranslations('tools.discount-calculator');
  const tc = useTranslations('common');

  const [originalPrice, setOriginalPrice] = useState('');
  const [discountRate, setDiscountRate] = useState('20');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');

  useEffect(() => {
    const price = parseFloat(originalPrice);
    const rate = parseFloat(discountRate);

    if (isNaN(price) || isNaN(rate) || !originalPrice) {
      setDiscountAmount('');
      setDiscountedPrice('');
      return;
    }

    const amount = (price * rate) / 100;
    const final = price - amount;

    setDiscountAmount(Math.round(amount).toLocaleString());
    setDiscountedPrice(Math.round(final).toLocaleString());
  }, [originalPrice, discountRate]);

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
            {
              title: t('article.section5.title'),
              content: t('article.section5.content'),
            },
          ]}
        />
      }
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('originalPrice')}
          </label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('discountRate')}
          </label>
          <input
            type="number"
            value={discountRate}
            onChange={(e) => setDiscountRate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {discountedPrice && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('discountAmount')}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{discountAmount}</div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('discountedPrice')}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{discountedPrice}</div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

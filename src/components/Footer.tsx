import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6">
            <Link
              href={`/${locale}/terms`}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {t('terms')}
            </Link>
            <Link
              href={`/${locale}/privacy`}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {t('privacy')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {t('contact')}
            </Link>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

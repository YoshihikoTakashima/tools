import { getTranslations, setRequestLocale } from 'next-intl/server';
import Breadcrumb from '@/src/components/Breadcrumb';

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('terms');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8">
      <Breadcrumb
        items={[
          { label: t('title') }
        ]}
        locale={locale}
      />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {t('title')}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        {t('lastUpdated')}
      </p>

      <div className="space-y-8 prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {t('section1.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {t('section1.content')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {t('section2.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {t('section2.content')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {t('section3.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {t('section3.content')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {t('section4.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {t('section4.content')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {t('section5.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {t('section5.content')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {t('section6.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {t('section6.content')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {t('section7.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {t('section7.content')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {t('section8.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {t('section8.content')}
          </p>
        </section>
      </div>
    </div>
  );
}

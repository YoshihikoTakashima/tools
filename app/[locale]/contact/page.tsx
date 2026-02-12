import { getTranslations, setRequestLocale } from 'next-intl/server';
import Breadcrumb from '@/src/components/Breadcrumb';

export const runtime = 'edge';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfr-CQHD0K1xguSsgCpWbauuUrM-G4peQjY_8EV_6Kj1FnI7w/viewform?usp=publish-editor';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8">
      <Breadcrumb
        items={[
          { label: t('title') }
        ]}
        locale={locale}
      />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {t('title')}
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {t('description')}
        </p>

        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
        >
          {t('formButton')} →
        </a>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
          {t('note')}
        </p>
      </div>
    </div>
  );
}

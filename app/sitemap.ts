import { MetadataRoute } from 'next';
import { tools } from '@/src/data/tools';
import { categories } from '@/src/data/categories';
import { articles } from '@/src/data/articles';
import { getAvailableYears } from '@/src/data/holidays';

const baseUrl = 'https://tools.realize-inc.co.jp';
const locales = ['ja', 'en'];

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Root
  routes.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  });

  // Locale roots
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });
  });

  // Tools (excluding calendar which has its own yearly routes)
  tools
    .filter((tool) => tool.slug !== 'calendar')
    .forEach((tool) => {
      locales.forEach((locale) => {
        routes.push({
          url: `${baseUrl}/${locale}/tool/${tool.slug}`,
          lastModified: new Date(tool.createdAt),
          changeFrequency: 'weekly',
          priority: tool.isRecommended ? 0.9 : 0.8,
        });
      });
    });

  // Calendar - yearly routes (auto-detect from holiday data)
  const calendarYears = getAvailableYears();
  locales.forEach((locale) => {
    // Current year calendar (without year in URL)
    routes.push({
      url: `${baseUrl}/${locale}/tool/calendar`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    });

    // Yearly calendars (only years with holiday data)
    calendarYears.forEach((year) => {
      routes.push({
        url: `${baseUrl}/${locale}/tool/calendar/${year}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: year === new Date().getFullYear() ? 0.9 : 0.7,
      });
    });
  });

  // Categories
  categories.forEach((category) => {
    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  // Search page
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  });

  // Articles
  articles.forEach((article) => {
    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}/articles/${article.slug}`,
        lastModified: new Date(article.updatedAt || article.createdAt),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });

  // Static pages
  const staticPages = ['terms', 'privacy', 'contact'];
  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.4,
      });
    });
  });

  return routes;
}

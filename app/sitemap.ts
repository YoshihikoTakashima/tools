import { MetadataRoute } from 'next';
import { tools } from '@/src/data/tools';
import { categories } from '@/src/data/categories';

const baseUrl = 'https://tools.realize-inc.co.jp';
const locales = ['ja', 'en'];

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

  // Tools
  tools.forEach((tool) => {
    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}/tool/${tool.slug}`,
        lastModified: new Date(tool.createdAt),
        changeFrequency: 'weekly',
        priority: tool.isRecommended ? 0.9 : 0.8,
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

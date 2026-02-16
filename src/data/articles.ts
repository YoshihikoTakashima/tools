export interface Article {
  id: string;
  slug: string;
  categorySlug: string;
  toolSlugs: string[]; // Related tools
  createdAt: string; // ISO date string
  updatedAt?: string;
}

export const articles: Article[] = [
  {
    id: '2026-calendar',
    slug: '2026-calendar',
    categorySlug: 'date',
    toolSlugs: ['calendar'],
    createdAt: '2026-02-16',
  },
];

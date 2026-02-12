export interface Tool {
  id: string;
  slug: string;
  categorySlug: string;
  isGlobal: boolean;
  keywords: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  icon: string;
}

export type Locale = 'ja' | 'en';

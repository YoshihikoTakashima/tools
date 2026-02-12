export interface Category {
  id: string;
  slug: string;
  icon: string;
}

export interface Tool {
  id: string;
  slug: string;
  categorySlug: string;
  isGlobal: boolean;
  keywords: string[];
  createdAt: string;
}

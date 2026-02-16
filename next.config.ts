import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts');

const nextConfig: NextConfig = {
  // Cloudflare Pagesへのデプロイ時は @cloudflare/next-on-pages を使用
  // 開発時は通常のNext.jsとして動作
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);

import { MetadataRoute } from 'next';
import { getSortedArticlesData } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://helia.media';
  const articles = getSortedArticlesData();

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.date ? new Date(article.date) : new Date('2026-10-07'),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-10-07'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date('2026-10-07'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...articleEntries,
  ];
}

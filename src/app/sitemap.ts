import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/projects/', '/blog/'].map((p) => ({ url: `${site.url}${p || '/'}` }));
  const posts = getAllPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: p.date }));
  return [...pages, ...posts];
}

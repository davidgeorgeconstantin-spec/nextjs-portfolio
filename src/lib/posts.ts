import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Post, PostMeta } from '@/types/content';

// Runs only at build time (Server Components), so reading files is fine.
const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

/** gray-matter turns `date: 2026-11-23` into a Date object, so normalize it back to YYYY-MM-DD. */
function toIsoDate(value: unknown): string {
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
}

function readingMinutes(text: string) {
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ''),
        title: String(data.title),
        date: toIsoDate(data.date),
        summary: String(data.summary),
        tags: (data.tags as string[]) ?? [],
        readingMinutes: readingMinutes(content),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return {
    slug,
    title: String(data.title),
    date: toIsoDate(data.date),
    summary: String(data.summary),
    tags: (data.tags as string[]) ?? [],
    readingMinutes: readingMinutes(content),
    html: marked.parse(content, { async: false }),
  };
}

export function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

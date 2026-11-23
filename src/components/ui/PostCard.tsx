import Link from 'next/link';
import { formatDate } from '@/lib/posts';
import type { PostMeta } from '@/types/content';

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}/`} className="group block rounded-3xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/5 dark:border-slate-800">
      <p className="text-sm text-slate-500">
        {formatDate(post.date)} · {post.readingMinutes} min read
      </p>
      <h3 className="mt-2 text-xl font-bold transition group-hover:text-cyan-600 dark:group-hover:text-cyan-400">{post.title}</h3>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{post.summary}</p>
      <span className="mt-4 inline-block text-sm font-semibold">
        Read more <span className="inline-block transition group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}

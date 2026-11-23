import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReadingProgress } from '@/components/motion/ReadingProgress';
import { Reveal } from '@/components/motion/Reveal';
import { formatDate, getAllPosts, getPost } from '@/lib/posts';

// Static export: every post page is generated at build time.
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.summary } : {};
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <ReadingProgress />
      <Link href="/blog/" className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white">
        ← All posts
      </Link>
      <Reveal>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-3 text-slate-500">
          {formatDate(post.date)} · {post.readingMinutes} min read · {post.tags.join(', ')}
        </p>
      </Reveal>
      {/* The HTML comes from our own Markdown files at build time, so it is trusted. */}
      <Reveal delay={0.15}>
        <article className="prose-post mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />
      </Reveal>
    </main>
  );
}

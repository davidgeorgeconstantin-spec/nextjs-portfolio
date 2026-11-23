import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/Reveal';
import { PostCard } from '@/components/ui/PostCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = { title: 'Blog', description: 'Short notes about what I learn while building web apps.' };

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <SectionHeading eyebrow="Blog" title="Notes from my learning">
        Written in simple English, because explaining something is the best way to learn it.
      </SectionHeading>
      <div className="space-y-5">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <PostCard post={p} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}

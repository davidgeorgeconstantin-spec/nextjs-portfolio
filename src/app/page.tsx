import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { SkillsMarquee } from '@/components/sections/SkillsMarquee';
import { ProjectsGrid } from '@/components/sections/ProjectsGrid';
import { RoadmapTimeline } from '@/components/sections/RoadmapTimeline';
import { ContactSection } from '@/components/sections/ContactSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PostCard } from '@/components/ui/PostCard';
import { Reveal } from '@/components/motion/Reveal';
import { projects } from '@/content/projects';
import { getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts().slice(0, 2);

  return (
    <main>
      <Hero />
      <SkillsMarquee />

      <section className="mx-auto max-w-6xl px-5 py-24">
        <SectionHeading eyebrow="Selected work" title="Featured projects">
          Learning projects from my public roadmap. Every one is open source on GitHub.
        </SectionHeading>
        <ProjectsGrid projects={projects.slice(0, 6)} />
        <Reveal className="mt-10 text-center">
          <Link href="/projects/" className="font-semibold text-cyan-600 hover:underline dark:text-cyan-400">
            See all 10 projects →
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-16 px-5 pb-24 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="About" title="From WordPress to full-stack">
            I started with HTML, CSS, PHP, WordPress and WooCommerce. Now I am learning React, TypeScript, Next.js and Node by building
            real projects, from an expense tracker to a SaaS. I hold the ECDL certificate and I am available for 40+ hours a week.
          </SectionHeading>
        </div>
        <RoadmapTimeline projects={projects} />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <SectionHeading eyebrow="Blog" title="Notes from my learning" />
        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <ContactSection />
    </main>
  );
}

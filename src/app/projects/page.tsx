import type { Metadata } from 'next';
import { ProjectsGrid } from '@/components/sections/ProjectsGrid';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { projects } from '@/content/projects';

export const metadata: Metadata = { title: 'Projects', description: 'All 10 projects from my React, Next.js and Node learning roadmap.' };

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading eyebrow="Roadmap" title="All projects">
        Ten learning projects, ordered from React basics to a full-stack SaaS. They are demos I built to learn — not client work.
      </SectionHeading>
      <ProjectsGrid projects={projects} />
    </main>
  );
}

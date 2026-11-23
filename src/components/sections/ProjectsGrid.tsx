'use client';

import { motion } from 'motion/react';
import { ProjectCard } from '@/components/ui/ProjectCard';
import type { Project } from '@/types/content';

/** Grid whose cards appear one after another when scrolled into view. */
export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.ul
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {projects.map((p) => (
        <motion.li key={p.slug} variants={{ hidden: { opacity: 0, y: 40, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 180, damping: 22 } } }}>
          <ProjectCard project={p} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

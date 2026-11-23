'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { Project } from '@/types/content';

const STATUS_LABEL = { live: 'Live', 'in-progress': 'In progress', planned: 'Planned' } as const;

/** Card that tilts in 3D and shows a light "spotlight" following the mouse. */
export function ProjectCard({ project }: { project: Project }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const spotX = useTransform(mx, (v) => `${v * 100}%`);
  const spotY = useTransform(my, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${spotX} ${spotY}, rgba(34,211,238,0.15), transparent 60%)`;

  return (
    <motion.article
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
    >
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: spotlight }} />
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm text-slate-400">#{String(project.order).padStart(2, '0')}</span>
        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">{STATUS_LABEL[project.status]}</span>
      </div>
      <h3 className="mt-4 text-xl font-bold">{project.title}</h3>
      <p className="mt-2 flex-1 text-slate-600 dark:text-slate-400">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <li key={s} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs dark:bg-slate-800">{s}</li>
        ))}
      </ul>
      <div className="mt-5 flex gap-4 text-sm font-semibold">
        {project.live && <a href={project.live} className="text-cyan-600 hover:underline dark:text-cyan-400">Live demo ↗</a>}
        {project.repo && <a href={project.repo} className="hover:underline">Code ↗</a>}
      </div>
    </motion.article>
  );
}

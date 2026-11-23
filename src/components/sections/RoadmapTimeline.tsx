'use client';

import { useRef } from 'react';
import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import type { Project } from '@/types/content';

/** Vertical timeline: the line "fills" as you scroll (GSAP ScrollTrigger scrub). */
export function RoadmapTimeline({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo('.timeline-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 60%', scrub: true } });
        gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((el) => {
          gsap.from(el, { x: -30, opacity: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative pl-8">
      <div className="absolute bottom-0 left-[11px] top-0 w-0.5 bg-slate-200 dark:bg-slate-800" />
      <div className="timeline-fill absolute bottom-0 left-[11px] top-0 w-0.5 origin-top bg-gradient-to-b from-cyan-400 to-purple-500" />
      <ol className="space-y-8">
        {projects.map((p) => (
          <li key={p.slug} className="timeline-item relative">
            <span className="absolute -left-8 top-1 grid h-6 w-6 place-items-center rounded-full border-2 border-cyan-400 bg-white text-[10px] font-bold dark:bg-slate-950">{p.order}</span>
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{p.stack.join(' · ')}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

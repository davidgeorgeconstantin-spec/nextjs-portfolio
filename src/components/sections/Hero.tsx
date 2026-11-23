'use client';

import { useRef } from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { gsap, MOTION_OK, SplitText, useGSAP } from '@/lib/gsap';
import { site } from '@/lib/site';

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Split the title into characters and animate them in a wave.
        const split = SplitText.create('.hero-title', { type: 'chars,words' });
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from(split.chars, { yPercent: 120, opacity: 0, rotate: 8, stagger: 0.025, duration: 0.8 })
          .from('.hero-fade', { y: 20, opacity: 0, stagger: 0.12, duration: 0.6 }, '-=0.4')
          .from('.hero-blob', { scale: 0.4, opacity: 0, duration: 1.4, stagger: 0.2 }, 0);
        // Blobs keep floating forever
        gsap.to('.hero-blob', { y: -30, x: 20, duration: 6, yoyo: true, repeat: -1, ease: 'sine.inOut', stagger: 1.5 });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-blob absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl" />
      <div aria-hidden="true" className="hero-blob absolute -right-10 top-40 h-80 w-80 rounded-full bg-purple-500/30 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 sm:pt-28">
        <p className="hero-fade mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm dark:border-slate-800">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Open to remote junior roles
        </p>
        <h1 className="hero-title max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
          I build fast, friendly web apps with <span className="text-cyan-500 dark:text-cyan-400">React & Next.js</span>
        </h1>
        <p className="hero-fade mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">{site.description}</p>
        <div className="hero-fade mt-9 flex flex-wrap gap-3">
          <MagneticButton href="/nextjs-portfolio/projects/">See my projects →</MagneticButton>
          <MagneticButton href={site.github} variant="ghost" target="_blank" rel="noopener">
            GitHub
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

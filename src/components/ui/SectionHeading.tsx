import { Reveal } from '@/components/motion/Reveal';

export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <Reveal className="mb-10">
      <p className="font-mono text-sm uppercase tracking-widest text-cyan-600 dark:text-cyan-400">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {children && <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{children}</p>}
    </Reveal>
  );
}

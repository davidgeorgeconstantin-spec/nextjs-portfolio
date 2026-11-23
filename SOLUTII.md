# Soluții: Proiectul 3, portofoliu + blog în Next.js

## Soluția 1: pagina /uses/
`src/app/uses/page.tsx`:
```tsx
import type { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata: Metadata = { title: 'Uses' };

const TOOLS = ['VS Code / Cursor', 'Google Chrome + DevTools', 'Git & GitHub', 'Node.js 22', 'Figma (basic)'];

export default function UsesPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <SectionHeading eyebrow="Setup" title="What I use" />
      <ul className="list-disc space-y-2 pl-6">
        {TOOLS.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </main>
  );
}
```
`src/lib/site.ts` → în `nav`: `{ href: '/uses/', label: 'Uses' },`

## Soluția 2: articol nou + număr de articole
Fișier nou `src/content/posts/building-skycast.md` (copiat, cu front matter nou).
`src/app/blog/page.tsx`:
```tsx
<SectionHeading eyebrow={`Blog · ${posts.length} posts`} title="Notes from my learning">
```

## Soluția 3: temă „system”
`src/components/ui/ThemeToggle.tsx`:
```tsx
type Theme = 'light' | 'dark' | 'system';
const ORDER: Theme[] = ['light', 'dark', 'system'];
const ICON = { light: '☀️', dark: '🌙', system: '💻' };

const [theme, setTheme] = useState<Theme>('system');
useEffect(() => setTheme((localStorage.getItem('theme') as Theme | null) ?? 'system'), []);

function apply(t: Theme) {
  const dark = t === 'dark' || (t === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
  if (t === 'system') localStorage.removeItem('theme');
  else localStorage.setItem('theme', t);
}

function toggle() {
  const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]!;
  setTheme(next);
  apply(next);
}
// în JSX: key={theme} și {ICON[theme]}
```

## Soluția 4: titluri animate cuvânt cu cuvânt
`src/components/motion/AnimatedHeading.tsx`:
```tsx
'use client';
import { useRef } from 'react';
import { gsap, MOTION_OK, SplitText, useGSAP } from '@/lib/gsap';

export function AnimatedHeading({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const split = SplitText.create(ref.current, { type: 'words' });
      gsap.from(split.words, {
        y: 30, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      });
      return () => split.revert();
    });
  }, { scope: ref });
  return <h2 ref={ref} className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{children}</h2>;
}
```
În `SectionHeading.tsx` înlocuiește `<h2>` cu `<AnimatedHeading>{title}</AnimatedHeading>`.

## Soluția 5: „Back to top”
`src/components/ui/BackToTop.tsx`:
```tsx
'use client';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';

export function BackToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 600));
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ y: -4 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-slate-900 text-white shadow-xl dark:bg-white dark:text-slate-900"
        >↑</motion.button>
      )}
    </AnimatePresence>
  );
}
```
Adaug-o în `src/app/layout.tsx`, după `<SiteFooter />`.

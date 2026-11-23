'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { nav, site } from '@/lib/site';

export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Hide the header when scrolling down, show it again when scrolling up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200);
    setScrolled(y > 20);
  });

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, '')));

  return (
    <motion.header
      animate={{ y: hidden ? -90 : 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`sticky top-0 z-40 transition-colors ${scrolled ? 'border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/70' : ''}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-bold tracking-tight">
          {site.name}
          <span className="text-gradient">.</span>
        </Link>
        <nav className="flex items-center gap-1">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="relative rounded-full px-3 py-1.5 text-sm font-medium sm:px-4">
              {isActive(item.href) && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-slate-100 dark:bg-slate-800" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
              )}
              {item.label}
            </Link>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </motion.header>
  );
}

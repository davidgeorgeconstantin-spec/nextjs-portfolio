'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { site } from '@/lib/site';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-16 text-center text-white sm:px-16">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.35),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.35),transparent_50%)]" />
        <div className="relative">
          <h2 className="text-3xl font-bold sm:text-5xl">Let&apos;s work together</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">I am looking for a remote junior role. I reply in English or Romanian.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <MagneticButton href={`mailto:${site.email}`} className="!bg-white !text-slate-900">Email me</MagneticButton>
            <button onClick={copyEmail} className="relative rounded-full border border-white/30 px-6 py-3 font-semibold">
              Copy email
              <AnimatePresence>
                {copied && (
                  <motion.span initial={{ opacity: 0, y: 8, scale: 0.9 }} animate={{ opacity: 1, y: -44, scale: 1 }} exit={{ opacity: 0 }} className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-500 px-3 py-1 text-sm">
                    Copied ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

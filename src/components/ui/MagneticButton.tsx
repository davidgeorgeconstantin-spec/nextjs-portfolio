'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useRef } from 'react';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
}

/** A link that is gently "pulled" towards the mouse cursor. */
export function MagneticButton({ children, variant = 'primary', className = '', ...props }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  }

  const styles =
    variant === 'primary'
      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
      : 'border border-slate-300 dark:border-slate-700';

  return (
    <motion.a
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold ${styles} ${className}`}
      {...(props as React.ComponentProps<typeof motion.a>)}
    >
      {children}
    </motion.a>
  );
}

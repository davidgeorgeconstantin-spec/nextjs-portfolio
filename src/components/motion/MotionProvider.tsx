'use client';

import { MotionConfig } from 'motion/react';

/** Disables big movements for users who prefer reduced motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

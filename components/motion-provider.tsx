"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/* Loads only the animation features we use (~half the bundle of the full `motion` component). */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

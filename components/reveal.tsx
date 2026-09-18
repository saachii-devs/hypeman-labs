"use client";

import { m, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type Tag = "div" | "h2" | "p";

type RevealProps<T extends Tag> = Omit<HTMLMotionProps<T>, "ref"> & {
  as?: T;
  /** position among sibling reveals: staggers the entrance by 70ms per step (max 6) */
  index?: number;
};

const BEZIER: [number, number, number, number] = [0.2, 1.3, 0.4, 1];
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/* Fades + lifts an element the first time it scrolls into view. */
export function Reveal<T extends Tag = "div">({ as, index = 0, ...props }: RevealProps<T>) {
  const reduce = useReducedMotion();
  const Comp = m[as ?? "div"] as unknown as React.ComponentType<HTMLMotionProps<T>>;
  const delay = Math.min(index, 6) * 0.07;

  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y: 40, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        opacity: { duration: 0.7, ease: EASE, delay },
        y: { duration: 0.9, ease: BEZIER, delay },
        rotate: { duration: 0.9, ease: BEZIER, delay },
      }}
      {...(props as HTMLMotionProps<T>)}
    />
  );
}

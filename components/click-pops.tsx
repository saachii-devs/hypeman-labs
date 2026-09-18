"use client";

import { m, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const WORDS = ["HYPE!", "W", "NO CAP", "SLAY", "BUSSIN", "LOUD", "ICONIC", "FR FR", "GOATED", "🔥", "💯", "SHEESH"];
const COLORS: [string, string][] = [
  ["#ffd21f", "#0d0d0d"],
  ["#960D1D", "#fff"],
  ["#2f4dff", "#fff"],
  ["#bfeccd", "#0d0d0d"],
  ["#e7d9ff", "#0d0d0d"],
  ["#f7b9a6", "#0d0d0d"],
];
const SPREAD = 60;
const EASE: [number, number, number, number] = [0.2, 1, 0.4, 1];

type Pop = { id: number; x: number; y: number; dx: number; dy: number; r: number; word: string; bg: string; fg: string };

/* Slang word bubbles that fly out wherever the page is clicked (not on links/buttons). */
export function ClickPops() {
  const reduce = useReducedMotion();
  const [pops, setPops] = useState<Pop[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest("a, button")) return;
      const [bg, fg] = COLORS[(Math.random() * COLORS.length) | 0];
      setPops((p) => [
        ...p,
        {
          id: nextId.current++,
          x: e.clientX,
          y: e.clientY,
          dx: (Math.random() - 0.5) * SPREAD * 2,
          dy: -(Math.random() * SPREAD + 20),
          r: (Math.random() - 0.5) * 40,
          word: WORDS[(Math.random() * WORDS.length) | 0],
          bg,
          fg,
        },
      ]);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [reduce]);

  const remove = (id: number) => setPops((p) => p.filter((x) => x.id !== id));

  return (
    <>
      {pops.map((p) => (
        <div key={p.id} className="pop-anchor" style={{ left: p.x, top: p.y }} aria-hidden="true">
          <m.div
            className="pop"
            style={{ background: p.bg, color: p.fg }}
            initial={{ x: 0, y: 0, scale: 0.2, rotate: p.r, opacity: 1 }}
            animate={{
              x: [0, p.dx * 0.4, p.dx],
              y: [0, p.dy * 0.4, p.dy - 40],
              scale: [0.2, 1.15, 0.9],
              rotate: [p.r, p.r, -p.r],
              opacity: [1, 0],
            }}
            transition={{
              duration: 1,
              ease: EASE,
              times: [0, 0.25, 1],
              opacity: { duration: 1, ease: EASE, times: [0, 1] },
            }}
            onAnimationComplete={() => remove(p.id)}
          >
            {p.word}
          </m.div>
        </div>
      ))}
    </>
  );
}

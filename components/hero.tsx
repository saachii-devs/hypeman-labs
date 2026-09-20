"use client";

import { m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type MouseEvent } from "react";
import { createPortal } from "react-dom";

const TRAIL = [
  "sticker-1",
  "sticker-blob",
  "sticker-bomb",
  "sticker-duck",
  "sticker-fire",
  "sticker-hypeman",
  "sticker-lips",
  "sticker-love",
  "sticker-org",
  "sticker-smiley",
  "sticker-spark2",
  "sticker-star",
].map((n) => `/images/trail/${n}.webp`);
const GAP = 55; // px the pointer must travel before the next sticker
const MAX = 24; // stickers alive at once

const RISE: [number, number, number, number] = [0.2, 1.4, 0.4, 1];
const POP: [number, number, number, number] = [0.2, 0.7, 0.2, 1];
const STEP = { duration: 0.7, ease: POP, times: [0, 0.4, 0.65, 1] };

type Sticker = { id: number; x: number; y: number; r: number; src: string };

const noop = () => () => {};
/* true after hydration, false during SSR: the trail portal needs document.body */
const useMounted = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

export function Hero() {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const enabled = useRef(false);
  const last = useRef({ x: -999, y: -999 });
  const idx = useRef(0);
  const nextId = useRef(0);

  useEffect(() => {
    enabled.current = !window.matchMedia("(hover: none)").matches;
    if (!enabled.current) return;
    for (const src of TRAIL) new window.Image().src = src; // warm the cache so the first stickers pop instantly
  }, []);

  /* stickers pop along the pointer, one after another, hero only */
  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!enabled.current) return;
    const { x, y } = last.current;
    if (Math.hypot(e.clientX - x, e.clientY - y) < GAP) return;
    last.current = { x: e.clientX, y: e.clientY };
    setStickers((s) => {
      if (s.length >= MAX) return s;
      return [
        ...s,
        {
          id: nextId.current++,
          x: e.clientX,
          y: e.clientY,
          r: +(Math.random() * 36 - 18).toFixed(1),
          src: TRAIL[idx.current++ % TRAIL.length],
        },
      ];
    });
  };
  const remove = (id: number) => setStickers((s) => s.filter((x) => x.id !== id));

  /* each word of the headline rises in; each line starts 100ms after the previous */
  const word = (line: number) => ({
    initial: reduce ? false : { y: "35%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.9, ease: RISE, delay: line * 0.1 },
  });

  return (
    <>
      <div className="hero-frame">
        <header className="hero" id="top" onMouseMove={onMove}>
          <div className="relative z-[2] mx-auto w-[92%] text-center max-[700px]:w-full">
            {/* Whitespace text nodes between the word spans are discarded by the flex
                line boxes, but they keep the extracted text readable to crawlers. */}
            <h1 className="headline">
              <span className="line">
                <m.span className="w" {...word(0)}>
                  Branding that
                </m.span>
              </span>{" "}
              <span className="line">
                <m.span className="w" {...word(1)}>
                  CREATEs hype
                </m.span>{" "}
                <m.span className="w gifbox" aria-hidden="true" {...word(1)}>
                  <Image src="/images/hype-meter.webp" alt="" fill sizes="300px" unoptimized priority />
                </m.span>{" "}
                <m.span className="w" {...word(1)}>
                  <span className="amp">&amp;</span> Design that
                </m.span>
              </span>{" "}
              <span className="line">
                <m.span className="w gifbox red" aria-hidden="true" {...word(2)}>
                  <Image src="/images/cat-clicking.gif" alt="" fill sizes="300px" unoptimized priority />
                </m.span>{" "}
                <m.span className="w yel" {...word(2)}>
                  clicks
                </m.span>
              </span>
            </h1>
          </div>
        </header>
      </div>

      {mounted &&
        createPortal(
          stickers.map((s) => (
            <m.img
              key={s.id}
              src={s.src}
              alt=""
              className="trail-img"
              style={{ left: s.x, top: s.y, rotate: s.r }}
              initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
              animate={{
                x: "-50%",
                y: ["-50%", "-54%", "-62%", "-80%"],
                scale: [0, 1, 1, 0.94],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{
                y: STEP,
                scale: STEP,
                opacity: { duration: 0.7, ease: POP, times: [0, 0.12, 0.4, 0.65, 1] },
              }}
              onAnimationComplete={() => remove(s.id)}
            />
          )),
          document.body,
        )}
    </>
  );
}

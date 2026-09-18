"use client";

import { m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Reveal } from "./reveal";
import { Lightbox } from "./lightbox";
import { WORK, type WorkItem } from "@/data/work";

/* per-tile stagger, same on the way in and out */
const DELAY = [0, 0.15, 0.1, 0.2];
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const LIFT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

type PinProps = { i: number; item: WorkItem; onOpen: (item: WorkItem) => void };

/* One collage tile: fades in when it enters the viewport and back out when it leaves. */
function Pin({ i, item, onOpen }: PinProps) {
  const reduce = useReducedMotion();
  const delay = DELAY[i % DELAY.length];
  const cover = item.images[0];
  const count = item.images.length;

  return (
    <m.figure
      className="pin"
      data-hover="VIEW"
      initial={reduce ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2 }}
      transition={{
        opacity: { duration: 0.9, ease: EASE, delay },
        y: { duration: 1, ease: LIFT, delay },
      }}
    >
      <button
        type="button"
        className="poster p-shot"
        onClick={() => onOpen(item)}
        aria-label={`Open ${item.title} (${count} ${count === 1 ? "image" : "images"})`}
      >
        <span className="save">{count > 1 ? `View · ${count}` : "View"}</span>
        <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 700px) 100vw, 50vw" placeholder="blur" />
      </button>
      <figcaption className="cap">
        <b>
          {item.url ? (
            <a href={item.url} target="_blank" rel="noopener noreferrer" data-hover="VISIT">
              {item.title}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          ) : (
            item.title
          )}
        </b>
        <span className="tags">
          {item.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </span>
      </figcaption>
    </m.figure>
  );
}

export function Work() {
  const [active, setActive] = useState<WorkItem | null>(null);
  const [index, setIndex] = useState(0);

  const open = useCallback((item: WorkItem) => {
    setIndex(0);
    setActive(item);
  }, []);
  const close = useCallback(() => setActive(null), []);

  return (
    <section className="relative bg-night text-white" id="work">
      <div className="wrap">
        <Reveal className="woah-head">
          <h2 className="big-title">
            <span className="flex items-center gap-[.18em]">
              Our{" "}
              <span className="title-gif" aria-hidden="true">
                <Image src="/images/cat-working.webp" alt="" fill sizes="300px" unoptimized />
              </span>
            </span>
            <span className="flex items-center gap-[.18em]">Woahrk!</span>
          </h2>
        </Reveal>

        <div className="collage" aria-label="Selected work">
          {WORK.map((item, i) => (
            <Pin key={item.slug} i={i} item={item} onOpen={open} />
          ))}
        </div>
      </div>

      <Lightbox item={active} index={index} onIndexChange={setIndex} onClose={close} />
    </section>
  );
}

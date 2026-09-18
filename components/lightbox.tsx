"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent,
} from "react";
import { createPortal } from "react-dom";
import type { WorkItem } from "@/data/work";

const noop = () => () => {};
/* false during SSR, true after hydration: the portal needs document.body */
const useMounted = () => useSyncExternalStore(noop, () => true, () => false);

type LightboxProps = {
  item: WorkItem | null;
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
};

const SWIPE = 48; // px of horizontal drag that counts as a swipe

/*
 * Fullscreen viewer for a work item's images. Portal'd to <body> so it sits
 * above the page (but under the custom cursor and paper grain).
 * Keyboard: Esc closes, arrows navigate. Touch: swipe left/right.
 */
export function Lightbox({ item, index, onIndexChange, onClose }: LightboxProps) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const [dir, setDir] = useState(0);
  const swipeStart = useRef<number | null>(null);

  const count = item?.images.length ?? 0;
  const open = item !== null;

  const go = useCallback(
    (delta: number) => {
      if (count < 2) return;
      setDir(delta);
      onIndexChange((index + delta + count) % count);
    },
    [count, index, onIndexChange],
  );

  /* keyboard, scroll lock, focus */
  useEffect(() => {
    if (!open) return;
    restoreFocus.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restoreFocus.current?.focus();
    };
  }, [open, onClose, go]);

  /*
   * Clicking the empty space around the picture closes the viewer. The <img>
   * box fills the whole stage (object-fit: contain letterboxes inside it), so
   * work out where the picture is actually painted before deciding.
   */
  const onStageClick = (e: ReactMouseEvent<HTMLElement>) => {
    const img = e.currentTarget.querySelector("img");
    if (img && img.naturalWidth && img.naturalHeight) {
      const r = img.getBoundingClientRect();
      const scale = Math.min(r.width / img.naturalWidth, r.height / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x0 = r.left + (r.width - w) / 2;
      const y0 = r.top + (r.height - h) / 2;
      const onPicture = e.clientX >= x0 && e.clientX <= x0 + w && e.clientY >= y0 && e.clientY <= y0 + h;
      if (onPicture) return;
    }
    onClose();
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === "touch") swipeStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > SWIPE) go(dx < 0 ? 1 : -1);
  };

  const image = item?.images[index];

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && item && image && (
        <m.div
          className="lb"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <div className="lb-bg" data-hover="CLOSE" onClick={onClose} />

          <header className="lb-head">
            <div className="lb-meta">
              <h3 className="lb-title">{item.title}</h3>
              <div className="lb-tags">
                {item.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            <div className="lb-tools">
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lb-link"
                  data-hover="VISIT"
                >
                  Visit site
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>
              )}
              {count > 1 && (
                <span className="lb-count" aria-live="polite">
                  {index + 1} / {count}
                </span>
              )}
              <button ref={closeBtn} type="button" className="lb-btn lb-close" onClick={onClose} data-hover="CLOSE" aria-label="Close">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              </button>
            </div>
          </header>

          <m.figure
            className="lb-stage"
            initial={reduce ? false : { scale: 0.96, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.2, 1.3, 0.4, 1] }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onClick={onStageClick}
          >
            <AnimatePresence initial={false} mode="wait" custom={dir}>
              <m.div
                key={index}
                className="lb-img"
                custom={dir}
                initial={reduce ? false : { opacity: 0, x: dir * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -28 }}
                transition={{ duration: 0.18 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="100vw"
                  priority
                  placeholder="blur"
                  draggable={false}
                />
              </m.div>
            </AnimatePresence>
            <figcaption className="sr-only">{image.alt}</figcaption>
          </m.figure>

          {count > 1 && (
            <>
              <button type="button" className="lb-btn lb-arrow lb-prev" onClick={() => go(-1)} data-hover="PREV" aria-label="Previous image">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <button type="button" className="lb-btn lb-arrow lb-next" onClick={() => go(1)} data-hover="NEXT" aria-label="Next image">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <nav className="lb-thumbs" aria-label="All images">
                {item.images.map((im, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`lb-thumb${i === index ? " on" : ""}`}
                    onClick={() => {
                      setDir(i > index ? 1 : -1);
                      onIndexChange(i);
                    }}
                    aria-label={`Image ${i + 1} of ${count}`}
                    aria-current={i === index ? "true" : undefined}
                    data-hover="VIEW"
                  >
                    <Image src={im.src} alt="" fill sizes="120px" />
                  </button>
                ))}
              </nav>
            </>
          )}
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

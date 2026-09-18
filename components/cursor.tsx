"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Custom cursor. Position is driven by a rAF lerp loop writing a transform
 * directly to the DOM (no React re-renders). Hover labels come from any
 * element carrying a `data-hover` attribute, via event delegation.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("TAP");
  const [big, setBig] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const loop = () => {
      cx += (mx - cx) * 0.22;
      cy += (my - cy) * 0.22;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const hover = t.closest<HTMLElement>("[data-hover]");
      if (hover) {
        setLabel(hover.dataset.hover ?? "");
        setBig(true);
      } else {
        setBig(false);
      }
      setHide(t.closest(".hero") !== null);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`cursor${big ? " big" : ""}${hide ? " hide" : ""}`}
      aria-hidden="true"
    >
      <span>{label}</span>
    </div>
  );
}

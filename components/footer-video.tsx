"use client";

import { useEffect, useRef } from "react";

/*
 * React does not emit the `muted` attribute in server HTML, which blocks autoplay
 * until hydration. Setting it on the element and calling play() makes the loop start.
 */
export function FooterVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <video ref={ref} className="foot-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
      <source src="/video/comic.mp4" type="video/mp4" />
    </video>
  );
}

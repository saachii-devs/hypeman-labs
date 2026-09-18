"use client";

import { m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Reveal } from "./reveal";
import khataserve from "@/assets/images/work/khataserve.png";
import khanpaan from "@/assets/images/work/khanpaan.png";
import unisoul from "@/assets/images/work/unisoul.png";
import cardMockup from "@/assets/images/work/hypemann-card-mockup.png";

/* per-tile stagger, same on the way in and out */
const DELAY = [0, 0.15, 0.1, 0.2];
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const LIFT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

type PinProps = { i: number; tags: string[]; title: string; children: React.ReactNode; className: string };

/* One collage tile: fades in when it enters the viewport and back out when it leaves. */
function Pin({ i, tags, title, children, className }: PinProps) {
  const reduce = useReducedMotion();
  const delay = DELAY[i];
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
      <div className={`poster ${className}`}>
        <span className="save">Save</span>
        {children}
      </div>
      <figcaption className="cap">
        <b>{title}</b>
        <span className="tags">
          {tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </span>
      </figcaption>
    </m.figure>
  );
}

export function Work() {
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
          {/* 1 Khataserve */}
          <Pin i={0} className="p-shot" title="Khataserve" tags={["logo", "web", "seo", "ai automation"]}>
            <Image
              src={khataserve}
              alt="Khataserve bookkeeping website on a laptop and a phone"
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              placeholder="blur"
            />
          </Pin>

          {/* 2 KhanpaanAI */}
          <Pin i={1} className="p-shot" title="KhanpaanAI" tags={["logo", "branding"]}>
            <Image
              src={khanpaan}
              alt="KhanpaanAI logo, an AI based restaurant management system"
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              placeholder="blur"
            />
          </Pin>

          {/* 3 Unisoul */}
          <Pin i={2} className="p-shot" title="Unisoul" tags={["logo", "web", "branding", "ai automation"]}>
            <Image
              src={unisoul}
              alt="Unisoul lotus logo and wordmark"
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              placeholder="blur"
            />
          </Pin>

          {/* 4 Hypemann business card */}
          <Pin i={3} className="p-shot" title="Hypemann business card" tags={["card design"]}>
            <Image
              src={cardMockup}
              alt="Hypemann business cards, front and back, stacked on a wooden desk"
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              placeholder="blur"
            />
          </Pin>
        </div>
      </div>
    </section>
  );
}

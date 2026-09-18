"use client";

import { m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Reveal } from "./reveal";

/* per-tile stagger, same on the way in and out */
const DELAY = [0, 0.15, 0.1, 0.2];
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const LIFT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

type PinProps = { i: number; category: string; title: string; children: React.ReactNode; className: string };

/* One collage tile: fades in when it enters the viewport and back out when it leaves. */
function Pin({ i, category, title, children, className }: PinProps) {
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
        <span>{category}</span>
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
          {/* 1 Night shift flyer */}
          <Pin i={0} className="p-night" title="Night Shift vol.05" category="flyer">
            <div className="spk" />
            <div className="vt">PARTY</div>
            <div className="nt">
              NIGHT
              <br />
              SHIFT
            </div>
            <div className="nm">
              <span>
                sat · vol.05
                <br />
                the warehouse
              </span>
              <strong>09PM</strong>
            </div>
          </Pin>

          {/* 2 Hype OG hoodie */}
          <Pin i={1} className="p-og" title="Hype OG Hoodie" category="merch">
            <svg viewBox="0 0 300 300" aria-label="Hype OG hoodie badge">
              <defs>
                <linearGradient id="ogGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fff3a0" />
                  <stop offset=".45" stopColor="#ffd21f" />
                  <stop offset=".7" stopColor="#c78a00" />
                  <stop offset="1" stopColor="#ffe066" />
                </linearGradient>
                <path id="ogArc" d="M52 150 A98 98 0 0 0 248 150" />
              </defs>
              <rect width="300" height="300" fill="#0c0c0c" />
              <circle cx="150" cy="150" r="130" fill="none" stroke="#1d1d1d" strokeWidth="30" />
              <path d="M52 150 A98 98 0 0 0 248 150" fill="none" stroke="#0d0d0d" strokeWidth="58" />
              <path d="M52 150 A98 98 0 0 0 248 150" fill="none" stroke="url(#ogGold)" strokeWidth="46" />
              <text
                style={{ fontFamily: "var(--font-block)" }}
                fontSize="30"
                fill="#0d0d0d"
                letterSpacing="6"
                dominantBaseline="middle"
              >
                <textPath href="#ogArc" startOffset="50%" textAnchor="middle">
                  HOODIE
                </textPath>
              </text>
              <path
                d="M34 108 L20 128 L34 148 M266 108 L280 128 L266 148"
                fill="none"
                stroke="url(#ogGold)"
                strokeWidth="6"
                strokeLinejoin="round"
              />
              <rect x="40" y="96" width="220" height="66" rx="6" fill="#0c0c0c" stroke="url(#ogGold)" strokeWidth="5" />
              <text
                x="150"
                y="148"
                textAnchor="middle"
                style={{ fontFamily: "var(--font-block)" }}
                fontSize="48"
                fill="url(#ogGold)"
                stroke="#3b2800"
                strokeWidth="1.5"
              >
                HYPE OG
              </text>
              <text
                x="150"
                y="70"
                textAnchor="middle"
                style={{ fontFamily: "var(--font-mono)" }}
                fontSize="12"
                fill="#8a7a3a"
                letterSpacing="5"
              >
                EST · 2026 · DROP 01
              </text>
            </svg>
          </Pin>

          {/* 3 Boxhead records */}
          <Pin i={2} className="p-box" title="Boxhead Records" category="mascot">
            <div className="bt">
              BOXHEAD
              <br />
              RECORDS
              <small>MASCOT · 3D · 2026</small>
            </div>
            <svg viewBox="0 0 240 250" aria-label="Boxhead mascot">
              <defs>
                <radialGradient id="boxG" cx=".35" cy=".3" r=".9">
                  <stop offset="0" stopColor="#fff" />
                  <stop offset=".7" stopColor="#eeeae3" />
                  <stop offset="1" stopColor="#bdb6ab" />
                </radialGradient>
              </defs>
              <path d="M22 250 C28 180 66 158 120 158 C174 158 212 180 218 250 Z" fill="#111" />
              <rect x="106" y="138" width="28" height="30" fill="#7a4a2e" />
              <path d="M86 166 Q120 218 154 166" fill="none" stroke="#e8e8e8" strokeWidth="5" strokeDasharray="3 4" />
              <rect x="112" y="200" width="16" height="20" rx="4" fill="#eee" stroke="#999" strokeWidth="2" />
              <path
                d="M190 250 C200 215 206 190 222 176"
                fill="none"
                stroke="#111"
                strokeWidth="26"
                strokeLinecap="round"
              />
              <g fill="#111">
                <circle cx="66" cy="44" r="15" />
                <circle cx="88" cy="32" r="16" />
                <circle cx="112" cy="26" r="17" />
                <circle cx="136" cy="28" r="16" />
                <circle cx="158" cy="36" r="16" />
                <circle cx="176" cy="50" r="14" />
                <circle cx="58" cy="62" r="12" />
                <circle cx="184" cy="68" r="11" />
              </g>
              <rect x="52" y="44" width="136" height="112" rx="32" fill="url(#boxG)" stroke="#111" strokeWidth="5" />
              <ellipse cx="96" cy="96" rx="11" ry="19" fill="#111" />
              <ellipse cx="144" cy="96" rx="11" ry="19" fill="#111" />
              <circle cx="92" cy="89" r="4" fill="#fff" />
              <circle cx="140" cy="89" r="4" fill="#fff" />
              <path d="M98 126 Q120 146 142 126" fill="none" stroke="#111" strokeWidth="6" strokeLinecap="round" />
              <ellipse cx="72" cy="120" rx="9" ry="5" fill="#ff8fa3" opacity=".7" />
              <ellipse cx="168" cy="120" rx="9" ry="5" fill="#ff8fa3" opacity=".7" />
            </svg>
          </Pin>

          {/* 4 Drip szn */}
          <Pin i={3} className="p-drip" title="Drip Szn wordmark" category="logo">
            <div className="dt">
              Drip
              <br />
              Szn
            </div>
          </Pin>
        </div>
      </div>
    </section>
  );
}

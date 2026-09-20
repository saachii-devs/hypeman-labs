"use client";

import Image from "next/image";
import type { SyntheticEvent } from "react";
import { Reveal } from "./reveal";

const SERVICES = [
  {
    n: "01",
    t: "AI & Automation",
    p: "Custom AI agents, chatbots, and workflow automations that do the boring parts for you. We wire your tools together so leads get answered, content gets drafted, and reports write themselves.",
  },
  {
    n: "02",
    t: "Logo",
    p: "Wordmarks, symbols, and lockups with a point of view. Logos so clean your competitors screenshot them, built to work on a billboard, a favicon, and a hoodie.",
  },
  {
    n: "03",
    t: "Website Development",
    p: "Launch pages, portfolios, and full sites that load fast and convert. Designed and built to be the loudest thing in the tab bar, on purpose.",
  },
  {
    n: "04",
    t: "Application Development",
    p: "iOS, Android, and web apps with interfaces that have personality: bold type, tight spacing, motion that means something. Researched, prototyped, tested, shipped.",
  },
];

const BRANDING = [
  {
    n: "5.1",
    t: "Naming & Nomenclature",
    p: "We create unique and memorable brand names and product names that reflect your identity and connect with your audience. Every name is distinctive, relevant, and built to strengthen your brand presence.",
  },
  {
    n: "5.2",
    t: "Brand Strategy",
    p: "Positioning, voice, and a point of view your competitors can't copy. We map who you are, who you're for, and why anyone should care before a single pixel gets pushed.",
  },
  {
    n: "5.3",
    t: "Brand Identity",
    p: "Type, color, and the whole system around your logo. An identity that stays consistent from the first post to the thousandth, and looks like you every time.",
  },
];

/* only one item open per level: opening one closes its open siblings */
function onToggle(e: SyntheticEvent<HTMLDetailsElement>) {
  const item = e.currentTarget;
  if (!item.open) return;
  item.parentElement?.querySelectorAll<HTMLDetailsElement>(".ab-item[open]").forEach((o) => {
    if (o !== item) o.open = false;
  });
}

function Summary({ n, t }: { n: string; t: string }) {
  return (
    <summary>
      <span className="n">{n}</span>
      <span className="t">{t}</span>
      <span className="pm" aria-hidden="true" />
    </summary>
  );
}

export function Abilities() {
  return (
    <section className="abilities relative" id="services">
      <div className="wrap">
        <Reveal as="h2" className="big-title" index={0}>
          <span className="flex items-center gap-[.18em]">
            Our{" "}
            <span className="title-gif" aria-hidden="true">
              <Image src="/images/abilities.avif" alt="" fill sizes="300px" unoptimized />
            </span>
          </span>{" "}
          <span className="flex items-center gap-[.18em]">Abilities</span>
        </Reveal>

        <Reveal className="ab-intro" index={1}>
          <a href="#contact" className="ab-more" data-hover="GO">
            Learn more
          </a>
          <p>
            Our abilities lie in building bold brand identities, intuitive UI/UX design, and packaging that
            sells. Every project is approached with curiosity and experimentation, combining artistry and
            strategy to deliver design that stands out and performs.
          </p>
        </Reveal>

        <Reveal className="ab-tabs" role="tablist" aria-label="Services" index={2}>
          <button className="ab-tab" type="button" role="tab" aria-selected="true" data-hover="PICK">
            Services
          </button>
        </Reveal>

        <div className="ab-panel" role="tabpanel">
          {SERVICES.map((s, i) => (
            <details key={s.n} className="ab-item" open={i === 0} onToggle={onToggle}>
              <Summary n={s.n} t={s.t} />
              <p>{s.p}</p>
            </details>
          ))}
          <details className="ab-item" onToggle={onToggle}>
            <Summary n="05" t="Branding" />
            <div className="ab-sub">
              {BRANDING.map((s) => (
                <details key={s.n} className="ab-item" onToggle={onToggle}>
                  <Summary n={s.n} t={s.t} />
                  <p>{s.p}</p>
                </details>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/images/logo.png";

const LINKS = [
  { id: "top", label: "Home", hover: "HI" },
  { id: "services", label: "Abilities", hover: "GO" },
  { id: "work", label: "Work", hover: "GO" },
  { id: "contact", label: "Contact", hover: "GO" },
] as const;

const OPEN: [number, number, number, number] = [0.2, 1, 0.3, 1];

export function Nav() {
  const [active, setActive] = useState<string>("top");
  /* phones only: the links live in a drawer behind the hamburger */
  const [open, setOpen] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  /* highlight the section currently in view */
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => {
        for (const en of entries) if (en.isIntersecting) setActive(en.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of LINKS) {
      const sec = document.getElementById(id);
      if (sec) spy.observe(sec);
    }
    return () => spy.disconnect();
  }, []);

  /* while the phone menu is open, Esc or a tap outside closes it */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (e.target instanceof Node && !nav.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const anchor = (i: number) => {
    const { id, label, hover } = LINKS[i];
    return (
      <a
        href={`#${id}`}
        className={active === id ? "active" : undefined}
        data-hover={hover}
        onClick={() => setOpen(false)}
      >
        {label}
      </a>
    );
  };

  return (
    <nav ref={nav} className={`nav${open ? " open" : ""}`}>
      <button
        type="button"
        className="nav-burger"
        aria-expanded={open}
        aria-controls="nav-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      {/* desktop row; on phones only the logo is visible */}
      <ul className="nav-row">
        <li>{anchor(0)}</li>
        <li>{anchor(1)}</li>
        <li className="nav-logo">
          <a href="#top" className="brand" data-hover="HI" onClick={() => setOpen(false)}>
            <Image
              src={logo}
              alt="Hypemann"
              priority
              sizes="(max-width: 700px) 210px, (max-width: 1000px) 26vw, 260px"
            />
          </a>
        </li>
        <li>{anchor(2)}</li>
        <li>{anchor(3)}</li>
      </ul>

      {/* phone drawer: the panel grows open and the links stagger in */}
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="drawer"
            id="nav-menu"
            className="nav-drawer"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.42, ease: OPEN },
              opacity: { duration: 0.22 },
            }}
          >
            <ul>
              {LINKS.map((l, i) => (
                <m.li
                  key={l.id}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
                  transition={{
                    opacity: { duration: 0.28, delay: 0.08 + i * 0.06 },
                    y: { duration: 0.42, ease: OPEN, delay: 0.08 + i * 0.06 },
                  }}
                >
                  {anchor(i)}
                </m.li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

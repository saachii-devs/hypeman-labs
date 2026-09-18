"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/assets/images/logo.png";

const LINKS = [
  { id: "top", label: "Home", hover: "HI" },
  { id: "services", label: "Abilities", hover: "GO" },
  { id: "work", label: "Work", hover: "GO" },
  { id: "contact", label: "Contact", hover: "GO" },
] as const;

export function Nav() {
  const [active, setActive] = useState<string>("top");

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

  const link = (i: number) => {
    const { id, label, hover } = LINKS[i];
    return (
      <li>
        <a href={`#${id}`} className={active === id ? "active" : undefined} data-hover={hover}>
          {label}
        </a>
      </li>
    );
  };

  return (
    <nav className="nav">
      <ul>
        {link(0)}
        {link(1)}
        <li className="nav-logo">
          <a href="#top" className="brand" data-hover="HI">
            <Image
              src={logo}
              alt="Hypemann"
              priority
              sizes="(max-width: 700px) 210px, (max-width: 1000px) 26vw, 260px"
            />
          </a>
        </li>
        {link(2)}
        {link(3)}
      </ul>
    </nav>
  );
}

import Image from "next/image";
import { Reveal } from "./reveal";

export function Cta() {
  return (
    <section className="cta relative" id="contact">
      <div className="wrap">
        <Reveal as="h2" className="cta-title" index={0}>
          <span className="flex flex-wrap items-center gap-[.2em]">Ready to take</span>
          <span className="flex flex-wrap items-center gap-[.2em]">
            your brand on{" "}
            <span className="title-gif" aria-hidden="true">
              <Image src="/images/wild-ride.webp" alt="" fill sizes="300px" unoptimized />
            </span>
          </span>
          <span className="flex flex-wrap items-center gap-[.2em]">a wild ride?</span>
        </Reveal>
        <Reveal as="p" className="cta-sub" index={1}>
          Give us a holla. We reply faster than your situationship.
        </Reveal>
        <Reveal className="cta-links" index={2}>
          <a href="mailto:hello@hypeman.studio" data-hover="SEND">
            Write to us
          </a>
          <a href="#" data-hover="MAP">
            Drop in at our office
          </a>
        </Reveal>
      </div>
    </section>
  );
}

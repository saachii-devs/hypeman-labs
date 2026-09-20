import Image from "next/image";
import { Reveal } from "./reveal";
import { WriteToUs } from "./write-to-us";
import { EMAIL, PHONE, PHONE_HREF } from "@/lib/contact";

export function Cta() {
  return (
    <section className="cta relative" id="contact">
      <div className="wrap">
        <Reveal as="h2" className="cta-title" index={0}>
          <span className="flex flex-wrap items-center gap-[.2em]">
            Ready to take
          </span>{" "}
          <span className="flex flex-wrap items-center gap-[.2em]">
            your brand on{" "}
            <span className="title-gif max-[700px]:hidden" aria-hidden="true">
              <Image
                src="/images/wild-ride.webp"
                alt=""
                fill
                sizes="300px"
                unoptimized
              />
            </span>
          </span>{" "}
          <span className="flex flex-wrap items-center gap-[.2em]">
            a wild ride?
            {/* on phones the gif moves here, after the last line, instead of wrapping mid-title */}
            <span
              className="title-gif hidden max-[700px]:inline-block"
              aria-hidden="true"
            >
              <Image
                src="/images/wild-ride.webp"
                alt=""
                fill
                sizes="300px"
                unoptimized
              />
            </span>
          </span>
        </Reveal>
        <Reveal as="p" className="cta-sub" index={1}>
          Give us a holla. We reply faster than your situationship.
        </Reveal>
        <Reveal className="cta-links" index={2}>
          <WriteToUs />
          <a href={`mailto:${EMAIL}`} className="cta-contact" data-hover="MAIL">
            <small>Email</small>
            {EMAIL}
          </a>
          <a href={PHONE_HREF} className="cta-contact" data-hover="CALL">
            <small>Contact</small>
            {PHONE}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

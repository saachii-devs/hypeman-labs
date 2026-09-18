import { Fragment } from "react";

const ITEMS = ["AI & AUTOMATION", "LOGO", "WEBSITE DEVELOPMENT", "APPLICATION DEVELOPMENT", "BRANDING"];

function Track() {
  return (
    <div className="relative flex shrink-0 animate-scroll">
      <span>
        {ITEMS.map((item) => (
          <Fragment key={item}>
            {item} <em>✦</em>
          </Fragment>
        ))}
      </span>
    </div>
  );
}

/* Yellow ribbon; two identical tracks scroll left so the loop is seamless. */
export function Marquee() {
  return (
    <div className="marquees" aria-hidden="true">
      <div className="marquee">
        <Track />
        <Track />
      </div>
    </div>
  );
}

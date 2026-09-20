import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/site";

export const alt = `${BRAND.name} — branding, websites, apps and AI automation for startups`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Brand tokens, mirrored from globals.css (satori has no CSS variables). */
const INK = "#0d0d0d";
const BONE = "#f3ecdf";
const YOLK = "#ffd21f";
const RED = "#960d1d";

export default async function Image() {
  // next/og reads ttf/otf/woff, not woff2, so the display face here is Comic Bold.
  const comicBold = await readFile(join(process.cwd(), "app/fonts/comicbold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BONE,
          padding: "64px 72px",
          fontFamily: "ComicBold",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 28, height: 28, background: RED, borderRadius: 999 }} />
          <div style={{ fontSize: 34, color: INK, letterSpacing: "0.02em" }}>
            {BRAND.name.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 96, color: INK, lineHeight: 1.02 }}>BRANDING,</div>
          <div style={{ fontSize: 96, color: INK, lineHeight: 1.02 }}>WEBSITES, APPS</div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 96, color: INK, lineHeight: 1.02 }}>&amp; AI</div>
            <div
              style={{
                fontSize: 60,
                color: INK,
                background: YOLK,
                padding: "6px 24px 14px",
                border: `5px solid ${INK}`,
                lineHeight: 1.02,
              }}
            >
              FOR STARTUPS
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 32, color: INK }}>hypeman.in</div>
          <div style={{ fontSize: 32, color: RED }}>branding that pops &amp; design that clicks</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "ComicBold", data: comicBold, style: "normal", weight: 400 }],
    },
  );
}

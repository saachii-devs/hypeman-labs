import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { MotionProvider } from "@/components/motion-provider";
import { Cursor } from "@/components/cursor";
import { ClickPops } from "@/components/click-pops";
import { OrganizationSchema } from "@/components/organization-schema";
import { BRAND, SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "Hypeman Labs is a startup studio for brand strategy, identity and naming, plus websites, mobile apps and AI automation. One team, from launch to scale.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${BRAND.name} — Branding, Websites, Apps & AI for Startups`,
  description: DESCRIPTION,
  applicationName: BRAND.name,
  alternates: { canonical: "/" },
  keywords: [
    "branding for startups",
    "startup branding agency",
    "website for startups",
    "app development for startups",
    "AI automation agency",
    "startup naming",
    "brand identity",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: BRAND.name,
    title: `${BRAND.name} — Branding, Websites, Apps & AI for Startups`,
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — Branding, Websites, Apps & AI for Startups`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <OrganizationSchema />
        <MotionProvider>
          <Cursor />
          {children}
          <ClickPops />
        </MotionProvider>
      </body>
    </html>
  );
}

/* Canonical site identity, shared by metadata, robots, sitemap and JSON-LD. */
import { EMAIL, PHONE } from "./contact";

export const SITE_URL = "https://hypeman.in";

export const BRAND = {
  name: "Hypeman Labs",
  shortName: "Hypeman",
  email: EMAIL,
  phone: PHONE,
} as const;

/**
 * Profile URLs for schema.org `sameAs`. This is how Google links hypeman.in to
 * the brand rather than to the dictionary word "hype man" — add every owned
 * profile here as it goes live.
 */
export const SAME_AS: string[] = [];

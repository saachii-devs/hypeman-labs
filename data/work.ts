import type { StaticImageData } from "next/image";

/*
 * Work catalog. One entry per project; the first image is the tile cover,
 * the rest show up in the fullscreen viewer.
 *
 * To add more shots to a project:
 *   1. drop the file in assets/images/work/<slug>/  (e.g. khataserve/02.png)
 *   2. import it below and push it onto that project's `images` list
 */
import khataserveCover from "@/assets/images/work/khataserve/cover.png";
import khataserveHero from "@/assets/images/work/khataserve/hero.png";
import khataserveServices from "@/assets/images/work/khataserve/services.png";
import khataserveContact from "@/assets/images/work/khataserve/contact.png";
import khanpaanCover from "@/assets/images/work/khanpaan/cover.png";
import unisoulCover from "@/assets/images/work/unisoul/cover.png";
import unisoulBrand from "@/assets/images/work/unisoul/03.png";
import unisoulSite from "@/assets/images/work/unisoul/04.png";
import cardCover from "@/assets/images/work/hypeman-card/cover.png";

export type WorkImage = { src: StaticImageData; alt: string };

export type WorkItem = {
  slug: string;
  title: string;
  tags: string[];
  images: WorkImage[];
  /** live site, shown as a "Visit site" link on the tile and in the viewer */
  url?: string;
};

export const WORK: WorkItem[] = [
  {
    slug: "khataserve",
    title: "Khataserve",
    tags: ["logo", "web", "seo", "ai automation"],
    url: "https://khataserve.com",
    images: [
      { src: khataserveCover, alt: "Khataserve bookkeeping website on a laptop and a phone" },
      { src: khataserveHero, alt: "Khataserve homepage hero: Don't run from the Tax Lady" },
      { src: khataserveServices, alt: "Khataserve services section with invoicing, purchase orders and inventory cards" },
      { src: khataserveContact, alt: "Khataserve contact page with the Tax Lady peeking over the form" },
    ],
  },
  {
    slug: "khanpaan",
    title: "KhanpaanAI",
    tags: ["logo", "branding"],
    images: [{ src: khanpaanCover, alt: "KhanpaanAI logo, an AI based restaurant management system" }],
  },
  {
    slug: "unisoul",
    title: "Unisoul",
    tags: ["logo", "web", "branding", "ai automation"],
    images: [
      { src: unisoulCover, alt: "Unisoul lotus logo and wordmark" },
      { src: unisoulBrand, alt: "Unisoul brand sheet: logo variations, colour palette and typography" },
      { src: unisoulSite, alt: "Unisoul beauty and spa website on a laptop and a phone" },
    ],
  },
  {
    slug: "hypeman-card",
    title: "Hypeman business card",
    tags: ["card design"],
    images: [{ src: cardCover, alt: "Hypeman business cards, front and back, stacked on a wooden desk" }],
  },
];

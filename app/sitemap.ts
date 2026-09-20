import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// One entry today because the site is one page. Service pages, case studies and
// posts get added here as they ship.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

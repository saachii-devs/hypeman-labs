import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Everything is public and everything is welcome, AI crawlers included: being
// quotable by ChatGPT, Perplexity and AI Overviews is a discovery channel we want.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

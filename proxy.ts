import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

/* Next.js 16 calls this file `proxy.ts` (it was `middleware.ts` before 16). */
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Everything except static assets and images, so the session is refreshed
     * on pages, route handlers and server actions without touching /_next files.
     *
     * robots.txt, sitemap.xml and the OG image are excluded too: they are crawler
     * endpoints that need no session, and a Supabase round trip on every crawl
     * only adds TTFB and a dependency they should not have.
     */
    "/((?!_next/static|_next/image|favicon.ico|icon.png|robots.txt|sitemap.xml|opengraph-image|images/|video/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|mp4|ttf|woff2?)$).*)",
  ],
};

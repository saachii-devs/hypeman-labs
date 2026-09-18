# Hypemann Studios

Single-page studio site built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Framer Motion.

## Run

```
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

## Structure

```
.
├── app/
│   ├── layout.tsx        fonts, metadata, cursor + click-pop overlays
│   ├── page.tsx          section order
│   ├── globals.css       Tailwind theme tokens + site styles
│   ├── fonts.ts          next/font (Google fonts self-hosted, local fonts)
│   ├── fonts/            Nauryz RedKeds, Comic Bold
│   └── icon.png          favicon
├── components/           one file per section + cursor, click pops, reveal helper
├── assets/images/        images imported through next/image (logo)
└── public/
    ├── images/           cursor, checker + halftone SVGs, gifs/webp, trail stickers
    └── video/            footer loop
```

## Supabase

Project ref: `gjhwuhwqgniykfydlygs`. Keys live in `.env.local` (git-ignored); `.env.example` lists the names.

```
utils/supabase/client.ts      browser client for Client Components
utils/supabase/server.ts      per-request client for Server Components, actions, route handlers
utils/supabase/middleware.ts  updateSession(): refreshes the auth cookie on each request
proxy.ts                      Next.js 16 request proxy (was middleware.ts before 16) that calls updateSession
supabase/config.toml          local CLI config from `supabase init`
```

Usage in a Server Component:

```ts
import { createClient } from "@/utils/supabase/server";

const supabase = await createClient();
const { data } = await supabase.from("your_table").select();
```

Link the CLI to the hosted project once (needs a browser login):

```
npx supabase login
npx supabase link --project-ref gjhwuhwqgniykfydlygs
```

Use `supabase.auth.getClaims()` (not `getSession()`) to protect server-rendered pages. New tables are not exposed to the Data API automatically; enable RLS and grant access when you create them.

## Notes

- Fonts load through `next/font`, so there is no request to Google Fonts at runtime and no layout shift.
- Hero trail stickers are 160px WebP (about 130 KB total instead of 13 MB of PNG).
- Big GIFs were converted to animated WebP; `cat-clicking.gif` stayed a GIF because it was smaller.
- Framer Motion is loaded through `LazyMotion` with the `domAnimation` feature set to keep the bundle small.

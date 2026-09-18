import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/*
 * Runs on every matched request (see proxy.ts): refreshes an expired auth
 * token and forwards the fresh cookies to both Server Components and the browser.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run other Supabase calls between createServerClient and getClaims:
  // that can make the session refresh race and sign users out at random.
  // getClaims verifies the JWT signature; getSession only reads the cookie.
  await supabase.auth.getClaims();

  // Always return supabaseResponse (or copy its cookies onto any new response)
  // so the refreshed session reaches the browser.
  return supabaseResponse;
}

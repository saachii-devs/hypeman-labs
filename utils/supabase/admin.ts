import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/*
 * Privileged client using the secret key. It BYPASSES row level security,
 * so use it only in trusted server code (route handlers, server actions,
 * cron jobs) and never pass it data straight from an untrusted request.
 * The "server-only" import makes the build fail if this file is ever
 * pulled into a Client Component.
 */
export function createAdminClient() {
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!secret) throw new Error("SUPABASE_SECRET_KEY is not set");

  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, secret, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

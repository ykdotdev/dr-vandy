// utils/supabase/server.js
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  // ⚡ Lazy initialization: executed when the server component runs
  return createServerClient({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY,
    cookies,
  });
}

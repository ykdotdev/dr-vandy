import { createClient } from "@supabase/supabase-js";

export const supabaseServer = createClient(
  "/supabase",
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);

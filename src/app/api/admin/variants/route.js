import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { persistSession: false, autoRefreshToken: false },
  },
);

export async function GET(req) {
  const product_id = req.nextUrl.searchParams.get("product_id");

  const { data, error } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", product_id)
    .order("qty_in_pack", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

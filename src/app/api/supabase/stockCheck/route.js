import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();
    const {qty,variant_id } =
      body;

    // check if stock>=qty
    const { data: data, error } = await supabase
      .from("product_variants")
      .select("current_stock", qty)
      .eq("id", variant_id)
      .maybeSingle();
    if (error) throw error;
    
    return NextResponse.json({ success: data.current_stock >= qty });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);

export async function POST(req) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("product_variants")
      .select("*")
      .order("created_at", { ascending: false });


    if (error) {
      throw error;
    }

    return NextResponse.json({
      orders: data,
    });
  } catch (err) {

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

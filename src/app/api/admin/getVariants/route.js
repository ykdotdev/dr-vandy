import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Incoming body:", body);

    const { data, error } = await supabase
      .from("product_variants")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("Supabase data:", data);
    console.log("Supabase error:", error);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      orders: data,
    });
  } catch (err) {
    console.error("Orders route error:", err);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

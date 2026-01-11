import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Incoming body:", body);

    const { promoCode } = body;

    if (!promoCode) {
      return NextResponse.json(
        { valid: false, message: "Missing promo code" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("promocodes")
      .select("discount_percentage")
      .eq("code", promoCode)
      .maybeSingle(); // <-- IMPORTANT

    console.log("Supabase data:", data);
    console.log("Supabase error:", error);

    if (error) {
      return NextResponse.json(
        { valid: false, message: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json({ valid: false });
    }

    return NextResponse.json({
      code: promoCode,
      valid: true,
      discount: data.discount_percentage,
    });
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json(
      { valid: false, message: "Server error" },
      { status: 500 }
    );
  }
}

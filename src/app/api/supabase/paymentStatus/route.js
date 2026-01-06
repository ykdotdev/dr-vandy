import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();
    const {order_id} =
      body;

    // check if stock>=qty
    const { data: data, error } = await supabase
      .from("orders")
      .select("status", "paid")
      .eq("razorpay_order_id", order_id)
      .maybeSingle();
    console.log("PAYMENT STATUS DATA",data)
    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

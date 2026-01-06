import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, email, phone, address, pincode, city, state, shippingMethod, amount } =
      body;


    // create order with pending status
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_name: fullName,
        user_phone: phone,
        user_email: email,
        address,
        city,
        state,
        pincode,
        shipping_method: shippingMethod,
        amount,
        status: "pending",
        razorpay_payment_id: null,
        razorpay_order_id: null,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(order);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

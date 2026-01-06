import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const { orderId, amount, user_name, user_phone, user_email } =
      await req.json();

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }
    
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const rpayOrder = await instance.orders.create({
      amount: amount,
      currency: "INR",
      receipt: orderId, // link to Supabase order
    });

    // Save Razorpay order ID in Supabase
    await supabase
      .from("orders")
      .update({ razorpay_order_id: rpayOrder.id, updated_at: new Date()})
      .eq("id", orderId);

    return NextResponse.json({
      ...rpayOrder,
      user_name,
      user_phone,
      user_email,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

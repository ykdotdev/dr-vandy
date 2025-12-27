export const runtime = "nodejs";

import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log(process.env.RAZORPAY_KEY_SECRET);
    const body = await req.json();
    const { amt, productName, orderId } = body;

    const amount = Number(amt);
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Amount is required" },
        { status: 400 }
      );
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await instance.orders.create({
      amount: amt*100, // convert rupees → paise
      currency: "INR",
      receipt: "orderId",
      description: "Dr. Vandy's",
      notes: {
        productName: "productName",
        
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

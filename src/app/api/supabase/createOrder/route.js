import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      qty,
      variant_id,
      fullName,
      email,
      phone,
      address,
      pincode,
      city,
      state,
      shippingMethod,
      amount,
    } = body;
    // const body = await req.json();

    // check if stock>=qty
    const { data: data, stockDataError } = await supabase
      .from("product_variants")
      .select("current_stock", qty)
      .eq("id", variant_id)
      .maybeSingle();
    console.log("STOCK CHECK LOG BACKEND: ", data, stockDataError?.message);

    if(data.current_stock<qty) return NextResponse.json({error: "Insufficient Stock"}, {status: 500});
    if(stockDataError) throw stockDataError;
    
    const { data: reserve, reserveError } = await supabase.rpc(
      "reserve_variant_stock",
      {
        p_variant_id: variant_id,
        p_qty: qty,
      }
    );

    if(reserveError) return NextResponse.json({ error: "Reserve Error" }, { status: 500 });

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
        reserved: true,
        razorpay_payment_id: null,
        razorpay_order_id: null,
      })
      .select()
      .single();
    

    if (error)  {
        const { data: qtyIncrement, qtyIncrementError } =
          await supabase.rpc("increment_variant_stock", {
            p_variant_id: variant_id,
          });
          
    }

    
    return NextResponse.json(order);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

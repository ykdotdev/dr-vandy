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
    console.log("ConfirmPayment body:", body);

    const { order_id, razorpay_payment_id, razorpay_order_id, status } = body;

    if (!order_id || !status) {
      console.log("Missing required fields:", body);
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase.rpc("update_order_payment_rpc", {
      p_order_id: order_id,
      p_razorpay_payment_id: razorpay_payment_id || null,
      p_razorpay_order_id: razorpay_order_id || null,
      p_status: status,
    });

    console.log("RPC result:", data, error);

    if (error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (err) {
    console.error("Route error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

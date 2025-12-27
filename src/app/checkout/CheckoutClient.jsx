"use client"
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import styles from "./page.module.css";


import React from 'react'

const CheckoutClient = ({variant, qty, amount}) => {
console.log(variant)
  const [currentQty, setQty] = useState(qty);
  const [currentAmt, setCurrentAmt] = useState(Number(amount)*qty)

  const[underProcess, setUnderProcess] = useState(false)

console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
     const startPayment = async () => {
        console.log(1)
        try{
            
        setUnderProcess(true)
         const ordersObj = {
           user_name: "",
           user_phone: "",
           user_email: "",
           address: "",
           pincode: 2,
           amount_paid: 2,
           razorpay_payment_id: "",
           razorpay_order_id: "",
           status: "",
           updated_at: new Date(Date.now()).toISOString(),
         };

         const { data: ordersData } = await supabase
           .from("orders")
           .insert([ordersObj])
           .select()
           .single();

         const orderItemsObj = {
           order_id: ordersData.id,
           variant_id: variant.id,
           quantity: currentQty,
           price_at_purchase: variant.price,
         };
         const { data: orderItemsData } = await supabase
           .from("order_items")
           .insert([orderItemsObj]);

    //    // 1. Load Razorpay script
    //    const loaded = await loadRazorpay();
    //    if (!loaded || !currentAmt || isNaN(currentAmt) || currentAmt <= 0) {
    //      alert("Failed to load Razorpay!");
    //      return;
    //    }

       // 2. Create order from backend
       console.log("CA", currentAmt);
       const order = await fetch("/api/razorpay/order", {
        
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           amt: currentAmt,
           productName: variant.name,
           orderId: ordersData.id
         }),
       }).then((res) => res.json());
       console.log(order)
      window.location.href = `https://api.razorpay.com/v1/checkout/embedded?order_id=${order.id}&key_id=${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID}`;

    //    // 3. Checkout options
    //    const options = {
    //      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // public key
    //      amount: order.amount,
    //      currency: order.currency,
    //      name: "Test Store",
    //      order_id: order.id,
    //      handler: function (response) {
    //        // fires after successful payment
    //        console.log("Payment Success:", response);
    //        alert(`Payment ID: ${response.razorpay_payment_id}`);
    //      },
    //      prefill: {
    //        name: "John Doe",
    //        email: "john@example.com",
    //        contact: "9999999999",
    //      },
    //    };

    //    // 4. Open Razorpay Checkout widget
    //    const payment = new window.Razorpay(options);
    //    payment.open();


     
        }
        catch(error){
            setUnderProcess(false);
            console.log(error);
        }
     };

    
  return (
    <div>
      <button disabled={underProcess} className={styles.buyBtn} onClick={startPayment}>
        Pay ₹{currentAmt}
      </button>
    </div>
  );
}

export default CheckoutClient

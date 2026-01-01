"use client";
import { useState } from "react";

export default function CheckoutClient() {
  const [pincode, setPincode] = useState(""); // string
  const [result, setResult] = useState(null); // any type, no TS needed
  const [loading, setLoading] = useState(false);

  const checkPincode = async () => {
    if (!pincode) return;
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/serviceability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pincode, weight: 0.5, cod: false }),
    });

    const data = await res.json();
    console.log(data)
    setResult(data);
    setLoading(false);
  };

  return (
    <div>
      <input
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        placeholder="Enter pincode"
      />
      <button onClick={checkPincode}>
        {loading ? "Checking..." : "Check Delivery"}
      </button>

      {result?.data?.available_courier_companies?.length > 0 && (
        <div>
          Delivery available! 🚚
          <br />
          ETA: {
            result.data.available_courier_companies[0].estimated_delivery_days
          }{" "}
          days
        </div>
      )}

      {result && result.available_courier_companies?.length === 0 && (
        <div>Delivery not available to this pincode.</div>
      )}

      {result?.message && <div>{result.message}</div>}
    </div>
  );
}

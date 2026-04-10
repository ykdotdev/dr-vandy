"use client"
import WiserPixelLoader from "@/components/WiserPixelLoader";
import Script from "next/script";

export default function ProductPage({ params }) {
  const productId = "123456789"; // replace with real Shopify product ID

  return (
    <div>
      <div
        className="senja-embed"
        data-id="c2a46b75-bad3-4e2a-b3f1-bb93204d12a3"
        data-mode="shadow"
        data-lazyload="false"
        style={{display: "block", width: "100%"}}
      ></div>
    </div>
  );
}

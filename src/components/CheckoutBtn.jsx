"use client";

import { useState } from "react";
import styles from "./CheckoutBtn.module.css";
import { useRouter } from "next/navigation";
import { useToast } from "./ToastProvider";
import clsx from "clsx";

const CheckoutBtn = ({ variant_id, quantity }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleCheckout = async () => {
    try {
      console.log(variant_id, quantity);
      setLoading(true);
      const res = await fetch("/api/cart/create", {
        method: "POST",
        body: JSON.stringify({
          lineItems: [
            {
              quantity: Number(quantity),
              merchandiseId: String(variant_id),
            },
          ],
        }),
      });
      const data = await res.json();
      // console.log("CART CHECKOUT", data);
      if (data?.data?.cartCreate?.cart?.checkoutUrl) {
        const checkoutUrl = data?.data?.cartCreate?.cart?.checkoutUrl;
        // console.log(checkoutUrl);
        window.location.href = checkoutUrl;
        setLoading(false);
      } else {
        showToast("Something went wrong!", "error");
        setLoading(false);
      }
      return;
    } catch (err) {
      showToast("Something went wrong!", "error");

      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={clsx(styles.CTAContainer, loading && styles.disabled)}
    >
      <span className={styles.label}>Buy Now</span>
      {loading ? (
        // Spinner SVG
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.spinner}
        >
          <path d="M12 2v4" />
          <path d="m16.2 7.8 2.9-2.9" />
          <path d="M18 12h4" />
          <path d="m16.2 16.2 2.9 2.9" />
          <path d="M12 18v4" />
          <path d="m4.9 19.1 2.9-2.9" />
          <path d="M2 12h4" />
          <path d="m4.9 4.9 2.9 2.9" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.icon}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m12 16 4-4-4-4" />
          <path d="M8 12h8" />
        </svg>
      )}
    </button>
  );
};

export default CheckoutBtn;

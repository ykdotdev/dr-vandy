"use client";

import React, { useState } from "react";
import styles from "./CheckoutBtn.module.css";
import { useRouter } from "next/navigation";
import { useToast } from "./ToastProvider";

const CheckoutBtn = ({ qty, vID, label }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleCheckout = async () => {
    setLoading(true);

    const stockCheckRes = await fetch("/api/supabase/stockCheck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qty,
        variant_id: vID,
      }),
    });

    const stockCheck = await stockCheckRes.json();

    if (!stockCheck.success) {
      console.log("INSUFFICIENT STOCK");
      // TODO: show modal / toast
      await showToast("Item just went Out of Stock", "error");
      window.location.reload();

      return;
    }
    // setLoading(false);

    router.push(`/checkout?v_id=${vID}&qty=${qty}`);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={styles.CTAContainer}
    >
      <span className={styles.label}>{loading ? "Checking" : label}</span>
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

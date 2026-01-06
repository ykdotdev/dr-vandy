"use client";

import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { useEffect } from "react";
import StepCTA from "../components/StepCTA";

const Page = () => {
  const searchParams = useSearchParams();
  const orderID = searchParams.oID;

  useEffect(() => {
    if (!orderID) return;

    const checkPaymentStatus = async () => {
      try {
        const res = await fetch("/api/supabase/paymentStatus", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: orderID }),
        });

        const data = await res.json();
        console.log("Payment status:", data);
      } catch (err) {
        console.error(err);
      }
    };

    checkPaymentStatus();
  }, [orderID]);

  return (
    <div className={styles.layoutFrame}>
      <div className={styles.mainCtn}>
        <div className={styles.headerCtn}>
          <div className={styles.stepLabelCtn}>
            <div className={styles.iconCtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.stepIcon}
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <span className={styles.stepTitle}>Your Cart</span>
          </div>
          <button className={styles.closeBtn}>
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className={styles.contentCTACtn}>
          <div className={styles.contentCtn}>
            <div className={styles.paymentStatusCtn}>
              <span className={styles.paymentStatusText}>
                Payment Successful
              </span>
            </div>

            <div className={styles.orderIDCtn}>
              <span>Order ID</span>
              <span>{orderID}</span>
            </div>
          </div>
          <StepCTA currentStep={1} btnStatus="active" />
        </div>
      </div>
    </div>
  );
};

export default Page;

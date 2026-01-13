"use client";

import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import StepCTA from "../components/StepCTA";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const orderID = searchParams.get("oID");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
        if(data?.status === "paid"){
          setStatus("success");
          setLoading(false);
        } else{
          setStatus("fail");
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
          setStatus("fail");
          setLoading(false);


      }
    };

    checkPaymentStatus();
  }, [orderID]);

  return (
    <div className={styles.layoutFrame}>
      {loading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.loadIcon}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      ) : (
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
              <span className={styles.stepTitle}>Payment</span>
            </div>
          </div>

          <div className={styles.contentCTACtn}>
            {status === "success" && (
              <div className={styles.contentCtn}>
                <div className={styles.paymentStatusCtn}>
                  <div className={clsx(styles.iconWrapper, styles.success)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.iconSuccess}
                    >
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <span className={styles.paymentStatusText}>
                    Payment Successful
                  </span>
                </div>

                <div className={styles.shippingOrderIDCtn}>
                  <span className={styles.shippingUpdateMessage}>
                    You will receive shipping updates via SMS/Email once your
                    order is dispatched.
                  </span>

                  <div className={styles.orderIDCtn}>
                    <span className={styles.orderIDLabel}>Order ID</span>
                    <span className={styles.orderIDValue}>{orderID}</span>
                  </div>
                </div>
              </div>
            )}

            {status === "fail" && (
              <div className={styles.contentCtn}>
                <div className={styles.paymentStatusCtn}>
                  <div className={clsx(styles.iconWrapper, styles.fail)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.iconFail}
                    >
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <span className={styles.paymentStatusText}>
                    Payment Failed
                  </span>
                </div>

                <div className={styles.shippingOrderIDCtn}>
                  <span className={styles.shippingUpdateMessage}>
                    If any amount was deducted, it will be automatically
                    refunded by your bank within 3–5 business days.
                  </span>

                  <div className={styles.orderIDCtn}>
                    <span className={styles.orderIDLabel}>Reference ID</span>
                    <span className={styles.orderIDValue}>{orderID}</span>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={()=>{
                router.push("/");
              }}
              className={
                styles.stepCTA
              }
            >
              <div className={styles.label}>Continue Shopping</div>
              
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

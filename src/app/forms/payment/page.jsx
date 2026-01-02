"use client";
import styles from "./page.module.css";
import clsx from "clsx";

const page = () => {
  return (
    <div className={styles.contentCtn}>
      <div className={styles.paymentStatusCtn}>
        <div className={styles.iconWrapper}>
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
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <span className={styles.paymentStatusText}>Payment Successful</span>
      </div>

      <div className={styles.shippingOrderIDCtn}>
        <span className={styles.shippingUpdateMessage}>
          You will receive shipping updates via SMS/Email once your order is
          dispatched.
        </span>

        <div className={styles.orderIDCtn}>
          <span className={styles.orderIDLabel}>Order ID</span>
          <span className={styles.orderIDValue}>ORD_2025_00123</span>
        </div>
      </div>
    </div>
  );
};

export default page;

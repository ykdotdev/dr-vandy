"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from './page.module.css'
import Lottie from "lottie-react";
import AnimatedCTA from "@/components/AnimatedCTA";
import successAnimationData from "@/animations/payment_successful.json";
import failedAnimationData from "@/animations/payment_failed.json";
import Link from "next/link";

const page = () => {
  const params = useSearchParams();
  const router = useRouter();

  const oid = params.get("oid");
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    // simulate processing / validation delay
    setTimeout(() => {
      setIsLoading(false);
      if (oid){
        localStorage.removeItem("cart");
      }
    }, 1500);
  }, [oid]);

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
      ) : oid ? (
        <div className={styles.paymentModal}>
          <div className={styles.header}>
            <span className={styles.orgTitleText}>Dr. Vandy's</span>
            <span className={styles.paymentStatusText}>Order Successful</span>
          </div>
          <span className={styles.animationCtn}>
            <Lottie
              animationData={successAnimationData}
              className={styles.animation}
              autoplay
              loop={false}
            />
          </span>
          <AnimatedCTA />
        </div>
      ) : (
        <div className={styles.paymentModal}>
          <div className={styles.header}>
            <span className={styles.orgTitleText}>Physiolution.co</span>
            <span className={styles.paymentStatusText}>
              Oops! Something went Wrong
            </span>
          </div>
          <span className={styles.animationCtn}>
            <Lottie
              animationData={failedAnimationData}
              className={styles.animation}
              autoplay
              loop={false}
            />
          </span>
          <Link href={'/cart'}
            className={styles.ctaBtn}
          >
            <div className={styles.label}>Retry Checkout</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;

// "use-client";
import React from 'react';
import styles from './CTA.module.css';
import { useRouter } from "next/navigation";

const CTA = ({productSlug, label}) => {

  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/products/${productSlug}`)}
      className={styles.CTAContainer}
    >
      <span className={styles.label}>{label}</span>
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
    </button>
  );
}

export default CTA

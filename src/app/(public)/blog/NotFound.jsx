"use client";

import React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconHome } from "./components/InlineIcons";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router?.push("/");
  };

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history?.back();
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.codeWrap}>
          <span className={styles.code} aria-hidden>
            404
          </span>
        </div>

        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.copy}>
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you
          back!
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleGoBack}
            className={clsx(styles.btn, styles.btnPrimary)}
          >
            <IconArrowLeft size={16} />
            Go Back
          </button>

          <button
            type="button"
            onClick={handleGoHome}
            className={clsx(styles.btn, styles.btnSecondary)}
          >
            <IconHome size={16} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

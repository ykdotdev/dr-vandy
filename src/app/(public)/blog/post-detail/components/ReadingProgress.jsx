"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./ReadingProgress.module.css";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const el = document.getElementById("article-content");
      if (!el) {
        setProgress(0);
        return;
      }

      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const rect = el.getBoundingClientRect();
      const elTop = scrollY + rect.top;
      const elHeight = el.scrollHeight || el.offsetHeight;
      const winH = window.innerHeight;

      const scrollEnd = elTop + elHeight - winH;
      const range = scrollEnd - elTop;

      let pct;
      if (range <= 0) {
        pct = scrollY >= elTop ? 100 : 0;
      } else {
        pct = ((scrollY - elTop) / range) * 100;
      }

      setProgress(Math.min(100, Math.max(0, pct)));
    };

    const onScrollOrResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      id="read-progress"
      className={styles.bar}
      style={{
        width: `${progress}%`,
        height: "4px",
        borderRadius: "var(--border-radius-pill)",
      }}
      aria-hidden="true"
    />
  );
}

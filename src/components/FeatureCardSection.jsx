"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "./FeatureCardSection.module.css";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const FeatureCardSection = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={clsx(styles.icon, styles.icon1)}
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      ),
      heading: "CBD Ayurvedic Formula",
      subheading: "Natural herbs enriched with CBD for holistic relief",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={clsx(styles.icon, styles.icon2)}
        >
          <path d="m10 20-1.25-2.5L6 18" />
          <path d="M10 4 8.75 6.5 6 6" />
          <path d="m14 20 1.25-2.5L18 18" />
          <path d="m14 4 1.25 2.5L18 6" />
          <path d="m17 21-3-6h-4" />
          <path d="m17 3-3 6 1.5 3" />
          <path d="M2 12h6.5L10 9" />
          <path d="m20 10-1.5 2 1.5 2" />
          <path d="M22 12h-6.5L14 15" />
          <path d="m4 10 1.5 2L4 14" />
          <path d="m7 21 3-6-1.5-3" />
          <path d="m7 3 3 6h4" />
        </svg>
      ),
      heading: !mounted
        ? "Pain & Inflammation Relief"
        : isTablet
          ? "Pain Relief Formula"
          : "Pain & Inflammation Relief",
      subheading: !mounted
        ? "Specifically formulated to reduce stiffness, soreness, and inflammation effectively"
        : isTablet
          ? "Herbal CBD blend for holistic relief"
          : "Specifically formulated to reduce stiffness, soreness, and inflammation effectively",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={clsx(styles.icon, styles.icon3)}
        >
          <path d="M12 6v6l4 2" />
          <path d="M22 12a10 10 0 1 0-11 9.95" />
          <path d="m22 16-5.5 5.5L14 19" />
        </svg>
      ),
      heading: !mounted
        ? "Daily & Long-Term Safe"
        : isTablet
          ? "Safe Everyday Use"
          : "Daily & Long-Term Safe",
      subheading: !mounted
        ? "Gentle, natural, and safe for everyday use, supporting long-term wellness."
        : isTablet
          ? "Gentle, natural, safe daily support for long-term wellness."
          : "Gentle, natural, and safe for everyday use, supporting long-term wellness.",
    },
  ];

  // Scroll-based index calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress within the container
      const scrollProgress = -containerTop / (containerHeight - viewportHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

      // Determine active index based on scroll progress
      const newIndex = Math.min(
        Math.floor(clampedProgress * data.length),
        data.length - 1,
      );

      if (newIndex !== activeIndex && newIndex >= 0) {
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex, data.length]);

  // Animation variants for icon (swipe down)
  const iconVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
  };

  // Animation variants for content (swipe up)
  const contentVariants = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  };

  const currentCard = data[activeIndex];

  return (
    <div className={styles.featureSectionCtn} ref={containerRef}>
      <div className={styles.stickyContainer}>
        <div className={styles.featureCard}>
          {/* Icon with swipe down animation */}
          <div className={styles.iconWrapper}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`icon-${activeIndex}`}
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ width: "100%", height: "100%" }}
              >
                {currentCard.icon}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content card stays fixed, only inner content animates */}
          <div className={styles.contentCtn}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${activeIndex}`}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={styles.contentInner}
              >
                <div className={styles.headingCtn}>
                  <span
                    className={clsx(
                      styles.headingIndex,
                      styles[`headingIndex${activeIndex + 1}`],
                    )}
                  >
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.headingText}>
                    {currentCard.heading}
                  </span>
                </div>
                <span className={styles.subheadingText}>
                  {currentCard.subheading}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          {data.map((_, index) => (
            <div
              key={index}
              className={clsx(
                styles.progressDot,
                activeIndex === index && styles.active,
                activeIndex === index && styles[`active${index + 1}`],
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCardSection;

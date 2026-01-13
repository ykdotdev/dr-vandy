import React, { useRef } from "react";
import styles from "./FeatureCard.module.css";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FeatureCard = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

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
      heading: "Pain & Inflammation Relief",
      subheading:
        "Specifically formulated to reduce stiffness, soreness, and inflammation effectively",
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
      heading: "Daily & Long-Term Safe",
      subheading:
        "Gentle, natural, and safe for everyday use, supporting long-term wellness",
    },
  ];


  
  useGSAP(
    () => {
      gsap.to(`.${styles.featureCard1}`, {
        scale: 0.7,
        opacity: 0,
        scrollTrigger: {
          trigger: `.${styles.featureCard1}`,
          start: "top 15%",
          end: "bottom 15%",
          scrub: true,
        },
      });
      gsap.to(`.${styles.featureCard2}`, {
        scale: 0.7,
        opacity: 0,
        scrollTrigger: {
          trigger: `.${styles.featureCard2}`,
          start: "top 15%",
          end: "bottom 15%",
          scrub: true,
        },
      });
      gsap.to(`.${styles.featureCard3}`, {
        // scale: 0.7,
        // opacity: 1,
        scrollTrigger: {
          trigger: `.${styles.featureCard3}`,
          start: "top 15%",
          end: "bottom 15%",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div className={styles.featureSectionCtn} ref={containerRef}>
      {data.map((card, index) => (
        <div
          className={clsx(
            styles.featureCard,
            styles[`featureCard${index + 1}`]
          )}
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
        >
          {card.icon}

          <div className={styles.contentCtn}>
            <div className={styles.headingCtn}>
              <span
                className={clsx(
                  styles.headingIndex,
                  styles[`headingIndex${index + 1}`]
                )}
              >
                {index + 1}
              </span>
              <span className={styles.headingText}>{card.heading}</span>
            </div>

            <span className={styles.subheadingText}>{card.subheading}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCard;

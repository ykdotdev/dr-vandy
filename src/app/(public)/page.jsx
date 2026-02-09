"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import FeatureCard from "@/components/FeatureCard";
import CTA from "@/components/CTA";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { sizeMobile, sizeTablet } from "@/config/constants";
import FeatureCardSection from "@/components/FeatureCardSection";
import { useRouter } from "next/navigation";
import { FlipCard } from "@/components/FlipCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const LandingPage = () => {
const isDesktop = useMediaQuery({ query: "(max-width: 1120px)" });
const isTablet = useMediaQuery({ query: `(max-width: ${sizeTablet})` });
const isMobile = useMediaQuery({ query: `(max-width: ${sizeMobile})` });

const [mounted, setMounted] = React.useState(false);
const router = useRouter();
React.useEffect(() => {
  setMounted(true);
}, []);

const cardData = [
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
        className={styles.icon}
      >
        <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <circle cx="17.5" cy="17.5" r="3.5" />
      </svg>
    ),
    title: "Doctor-Formulated Relief",
    description:
      "Developed with a clinical understanding of pain, Dr. Vandy’s OrthoHemp Oil is thoughtfully formulated to address inflammation, stiffness, and muscular discomfort at the root — not just mask symptoms. Every ingredient is chosen for safety, synergy, and real-world effectiveness.",
  },
  {
    icon: <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className={styles.icon}
>
  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
</svg>,
    title: "Complete nutrition",
    description:
      "Complete nutrition with protein, Omegas, and all essential amino acids to support your overall wellness.",
  },
  {
    icon: "💧",
    title: "Heals and hydrates",
    description:
      "Heals and hydrates skin & scalp, calming irritation from within for a healthier complexion.",
  },
  {
    icon: "🌍",
    title: "Saves water, restores soil",
    description:
      "Saves water, restores soil, and absorbs more CO₂ than trees, making it an eco-friendly choice.",
  },
];


  return (
    <div className={styles.mainContainer}>
      <Navbar />
      
      <div className={styles.heroSection}>
        {/* <h1 className={styles.heroTitle}>Dr. Vandy’s</h1> */}

        <div className={styles.primaryCtn}>
          <div className={styles.mainSection}>
            <div className={styles.productTextCtn}>
              <span className={styles.productTitle}>
                Dr. Vandy’s OrthoHemp™ Pain Relief Oil
              </span>
              <span className={styles.productDescription}>
                Doctor-Formulated | CBD-Enriched | 100% Plant-Based Relief
              </span>
            </div>
            <div className={styles.ctaRow}>
              <CTA productSlug="orthohemp-oil" label="Buy Now" />
              {mounted && isDesktop && (
                <button
                  className={styles.learnMoreBtn}
                  onClick={() => {
                    router.push("/products/orthohemp-oil?i=1");
                  }}
                >
                  <span className={styles.label}>Learn More</span>
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
                    className={styles.icon}
                  >
                    <path d="m5 9 7-7 7 7" />
                    <path d="M12 16V2" />
                    <circle cx="12" cy="21" r="1" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className={styles.secondarySection}>
            <span className={styles.promoText}>
              India’s first pain relief blend powered by Hemp Seed Oil, CBD,
              Arnica CO₂, and Boswellia — optimized with a dual-absorption hemp
              and virgin coconut base.
            </span>
            <button
              className={styles.learnMoreBtn}
              onClick={() => {
                router.push("/products/orthohemp-oil?i=1");
              }}
            >
              <span className={styles.label}>Learn More</span>
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
                className={styles.icon}
              >
                <path d="m5 9 7-7 7 7" />
                <path d="M12 16V2" />
                <circle cx="12" cy="21" r="1" />
              </svg>
            </button>
          </div>
          <img src="/bottle.png" className={styles.bottleImg} />
        </div>

        <div className={styles.featureStrip}>
          <div className={styles.card01}>
            <span className={styles.text}>
              {!mounted
                ? "POWERFUL TRIPLE ACTION RELIEF"
                : isTablet
                  ? "TRIPLE ACTION RELIEF"
                  : "POWERFUL TRIPLE ACTION RELIEF"}
            </span>
          </div>
          <div className={styles.card02}>
            <span className={styles.text}>
              Analgesic · Anti-Inflammatory · Restorative
            </span>
          </div>
          <div className={styles.card03}>
            <div className={styles.container}>
              <span className={styles.countText}>5K+</span>
              <span className={styles.text}>Satisfied Customers</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.aboutSection}>
        <div className={styles.aboutCard}>
          <span className={styles.headingText}>
            {!mounted
              ? "What Makes Our Relief Different?"
              : isMobile
                ? "About Us"
                : "What Makes Our Relief Different?"}
          </span>
          <span className={styles.subheadingText}>
            {!mounted
              ? "Our mission, our process, and the science behind natural healing."
              : isTablet
                ? ""
                : "Our mission, our process, and the science behind natural healing."}
          </span>

          <button
            className={styles.aboutCTA}
            onClick={() => {
              router.push("/about");
            }}
          >
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
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.featureSection}>
        {cardData.map((card, index) => (
          <FlipCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
      {/* <FeatureCardSection /> */}

      <div className={styles.testimonialSection}>
        <div className={styles.testimonialCard}>
          <span className={styles.iconContainer}>
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
              <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
              <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
            </svg>
          </span>
          <div className={styles.contentCtn}>
            <span className={styles.text}>
              This oil reduced my mother’s knee pain within a week. It's now a
              part of her daily routine!
            </span>
          </div>

          <div className={styles.userDetailsCtn}>
            <span className={styles.nameText}>– Priya</span>
            <span className={styles.detailsText}>38, Mumbai</span>
          </div>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <div className={styles.textCtn}>
          <span className={styles.headingText}>
            Experience Natural Pain Relief
          </span>
          <span className={styles.subheadingText}>
            Move better. Live better.
          </span>
        </div>
        <CTA productSlug="orthohemp-oil" label="Shop Now" />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;

"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import FeatureCard from "@/components/FeatureCard";
import CTA from "@/components/CTA";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { sizeMobile, sizeTablet } from "@/config/constants";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ExpandablePillars from "@/components/ExpandablePillars";

const LandingPage = () => {
const isDesktop = useMediaQuery({ query: "(max-width: 1120px)" });
const isTablet = useMediaQuery({ query: `(max-width: ${sizeTablet})` });
const isMobile = useMediaQuery({ query: `(max-width: ${sizeMobile})` });
const isPillarMobile = useMediaQuery({ query: "(max-width: 1000px)" });

const [mounted, setMounted] = React.useState(false);
const router = useRouter();
React.useEffect(() => {
  setMounted(true);
}, []);

const featureCardData = [
  {
    iconPath: (
      <>
        <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
        <path d="M6.453 15h11.094" />
        <path d="M8.5 2h7" />
      </>
    ),
    heading: "Doctor-Formulated Relief",
    description:
      "Developed with a clinical understanding of pain, Dr. Vandy’s OrthoHemp Oil is thoughtfully formulated to address inflammation, stiffness, and muscular discomfort at the root — not just mask symptoms. Every ingredient is chosen for safety, synergy, and real-world effectiveness.",
  },
  {
    iconPath: (
      <>
        <path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12" />
        <path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z" />
        <path d="m2 22 .414-.414" />
      </>
    ),
    heading: "CBD-Rich Vijaya Leaf Extract",
    description:
      "Our formulation features Vijaya Leaf Extract, naturally rich in CBD-like compounds that interact with the body’s pain and inflammation pathways. This helps calm irritated tissues, reduce discomfort, and support faster recovery — without intoxicating effects.",
  },
  {
    iconPath: (
      <>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </>
    ),
    heading: "16 Therapeutic Botanicals",
    description:
      "A clinically inspired blend of 16 botanicals including Arnica CO₂, Boswellia, Turmeric CO₂, Ginger, Menthol, and Camphor works together to deliver fast, deep-tissue comfort. Each botanical plays a role — from easing soreness to improving circulation and mobility.",
  },
  {
    iconPath: (
      <>
        <path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762" />
      </>
    ),
    heading: "Clean, Skin-Friendly Base Oils",
    description:
      "Hemp Seed Oil, Virgin Coconut Oil, and Almond Oil create a lightweight, fast-absorbing base that nourishes the skin while carrying active botanicals deep into the tissues. Stabilised with natural Vitamin E, the oil remains gentle, non-greasy, and suitable for daily use.",
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
              Pain relief blend powered by Hemp Seed Oil, CBD,
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
              TRIPLE ACTION RELIEF
            </span>
          </div>
          <div className={styles.card02}>
            <span className={styles.text}>
              Analgesic · Anti-Inflammatory · Restorative
            </span>
          </div>
          <div className={styles.card03}>
            <div className={styles.container}>
              <span className={styles.countText}>1K+</span>
              <span className={styles.text}>Satisfied Customers</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.aboutSection}>
        <div className={styles.aboutCard}>
          <span className={styles.headingText}>
            {!mounted
              ? "Our Journey to Better Relief"
              : isMobile
                ? "About Us"
                : "Our Journey to Better Relief"}
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
        <div className={styles.sectionHeading}>The Power Behind the Relief</div>
        <div className={styles.featureGrid}>
          {featureCardData.map((card, index) => (
            <FeatureCard
              iconPath={card.iconPath}
              heading={card.heading}
              description={card.description}
              number={index + 1}
              key={index}
            />
          ))}
        </div>
      </div>

      <div className={styles.pillarsSection}>
        {mounted && isPillarMobile && (
          <span className={styles.sectionHeading}>
            16 <span className={styles.specialStyling}>Therapeutic</span>{" "}
            Botanicals
          </span>
        )}
        <div className={styles.largeCtn}>
          <div className={styles.pillars}>
            {/* {pillarData.map((pillar, index) => (
              <Pillar label={pillar.label} number={index + 1} key={index} />
            ))} */}
            <ExpandablePillars />
          </div>
          {mounted && !isPillarMobile && (
            <div className={styles.textCtn}>
              <span className={styles.number}>16</span>
              <span className={styles.sectionHeading}>
                <span className={styles.specialStyling}>Therapeutic</span>{" "}
                Botanicals
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.testimonialSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionHeading}>
            What Our Customers Are Saying
          </span>
          {mounted && !isTablet && (
            <span className={styles.sectionSubheading}>
              Discover how our formula is transforming lives, one body at a
              time.
            </span>
          )}
        </div>
        <div className={styles.testimonialCtn}>
          <span className={styles.testimonial}>
            “This oil reduced my mother’s knee pain within a week. It's now a
            part of her daily routine! This oil reduced my mother’s knee pain
            within a week. It's now a part of her daily routine!
          </span>
          <div className={styles.detailsCtn}>
            <span className={styles.name}>Priya</span>
            <span className={styles.subDetails}>38, Mumbai</span>
          </div>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <div className={styles.textCtn}>
          <span className={styles.sectionHeading}>
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

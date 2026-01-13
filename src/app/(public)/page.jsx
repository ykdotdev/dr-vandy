"use client";

// import { supabase } from "@/lib/supabaseClient";

import React from "react";
import styles from "./page.module.css";
import FeatureCard from "@/components/FeatureCard";
import CTA from "@/components/CTA";
import clsx from "clsx";

const LandingPage = () => {

  return (
    <div className={styles.mainContainer}>
      <div className={styles.navbar}>
        <h1 className={styles.logo}>Dr. Vandy’s™</h1>

        <div className={styles.navMenu}>
          <div className={styles.navItems}>
            <a className={clsx(styles.navItem, styles.navItem01)}>Product</a>
            <a className={clsx(styles.navItem, styles.navItem02)}>About</a>
            <a className={clsx(styles.navItem, styles.navItem03)}>Contact</a>
          </div>

          <div className={styles.ctaContainer}>
            <button className={styles.ctaText}>Buy Now</button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.ctaIcon}
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Dr. Vandy’s</h1>

        <div className={styles.primaryCtn}>
          <img src="/bottle.png" className={styles.bottleImg} />
          <div className={styles.mainSection}>
            <div className={styles.productTextCtn}>
              <span className={styles.productTitle}>
                Dr. Vandy’s OrthoHemp™ Pain Relief Oil
              </span>
              <span className={styles.productDescription}>
                Doctor-Formulated | CBD-Enriched | 100% Plant-Based Relief
              </span>
            </div>
            <CTA productSlug="orthohemp-oil" label="Buy Now" />
          </div>

          <div className={styles.secondarySection}>
            <span className={styles.promoText}>
              India’s first pain relief blend powered by Hemp Seed Oil, CBD,
              Arnica CO₂, and Boswellia — optimized with a dual-absorption hemp
              and virgin coconut base.
            </span>
            <div className={styles.learnMoreBtn}>
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
            </div>
          </div>
        </div>

        <div className={styles.featureStrip}>
          <div className={styles.card01}>
            <span className={styles.text}>POWERFUL TRIPLE ACTION RELIEF</span>
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
            What Makes Our Relief Different?
          </span>
          <span className={styles.subheadingText}>
            Our mission, our process, and the science behind natural healing.
          </span>

          <div className={styles.aboutCTA}>
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
          </div>
        </div>
      </div>

      <div className={styles.featureSection}>
        <FeatureCard/>
      </div>

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
        <CTA label="Shop Now" />
      </div>

      <div className={styles.footer}>
        <span className={styles.privacyPolicyText}>Privacy Policy</span>
        <span className={styles.copyrightText}>
          Copyright © 2025 drvandys.com - All Rights Reserved.
        </span>

        <div className={styles.iconsCtn}>
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
            className={clsx(styles.footerIcon, styles.instagramIcon)}
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
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
            className={clsx(styles.footerIcon, styles.facebookIcon)}
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
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
            className={clsx(styles.footerIcon, styles.youtubeIcon)}
          >
            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
            <path d="m10 15 5-3-5-3z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import FeatureCard from "@/components/FeatureCard";
import CTA from "@/components/CTA";
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

const [learnLoading, setLearnLoading] = useState(false);

const handleLearnClick = () => {
  setLearnLoading(true); // start loading (never ends)
  router.push("/products/orthohemp-oil?i=1");

};

const testimonials = [
  {
    quote:
      "Dr. Vandy’s OrthoHemp Pain Relief Oil is ideal for hockey players. Its fast absorption and natural formulation make it suitable for regular athletic use",
    name: "Bharat Kumar Chettri",
    details: "Former captain of the Indian Hockey National Team",
  },
  {
    quote:
      "Dr. Vandy’s OrthoHemp Pain Relief Oil Helps control muscle inflammation and soreness during heavy workloads. Very reliable.",
    name: "Vandana Katariya",
    details: "Former Indian Hockey Player",
  },
  {
    quote:
      "Dr. Vandy’s OrthoHemp Pain Relief Oil is Perfect for back and shoulder stiffness from defensive drills. Very soothing and effective.",
    name: "Mahima Choudhary",
    details: "Member of Indian Women Hockey Team",
  },
  {
    quote:
      "Dr. Vandy’s OrthoHemp Pain Relief Oil Improves mobility and reduces stiffness significantly after endurance sessions",
    name: "Noor Orpa de Baat (Midfielder)",
    details: "Dutch Hockey Player",
  },
  {
    quote:
      "Dr. Vandy’s OrthoHemp Pain Relief Oil is Natural yet powerful—helps control inflammation after long, intense practice days",
    name: "Sosha Carina Benninga",
    details: "Dutch Hockey Player (Forward)",
  },
];

const [testimonialCurrentIndex, setTestimonialCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index) => {
    setTestimonialCurrentIndex(index)
  }

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
    heading: "Vijaya Leaf Extract",
    description:
      "Our formulation features Vijaya Leaf Extract, that interacts with the body’s pain and inflammation pathways. This helps calm irritated tissues, reduce discomfort, and support faster recovery — without intoxicating effects.",
  },
  {
    iconPath: (
      <>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </>
    ),
    heading: "Therapeutic Botanicals",
    description:
      "A clinically inspired blend of botanicals including Arnica CO₂, Boswellia, Turmeric CO₂, Ginger, Menthol, and Camphor works together to deliver fast, deep-tissue comfort. Each botanical plays a role — from easing soreness to improving circulation and mobility.",
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
                Doctor-Formulated | Vijaya - Powered | 100% Plant-Based Relief
              </span>
            </div>
            <div className={styles.ctaRow}>
              <CTA productSlug="orthohemp-oil" label="Buy Now" />
              {mounted && isDesktop && (
                <button
                  className={styles.learnMoreBtn}
                  onClick={handleLearnClick}
                  disabled={learnLoading}
                >
                  <span className={styles.label}>Learn More</span>
                  {learnLoading ? (
                    // Spinner SVG
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.spinner}
                    >
                      <path d="M12 2v4" />
                      <path d="m16.2 7.8 2.9-2.9" />
                      <path d="M18 12h4" />
                      <path d="m16.2 16.2 2.9 2.9" />
                      <path d="M12 18v4" />
                      <path d="m4.9 19.1 2.9-2.9" />
                      <path d="M2 12h4" />
                      <path d="m4.9 4.9 2.9 2.9" />
                    </svg>
                  ) : (
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
                  )}
                </button>
              )}
            </div>
          </div>

          <div className={styles.secondarySection}>
            <span className={styles.promoText}>
              Pain relief blend powered by Hemp Seed Oil, Vijaya Leaf Extract,
              Arnica CO₂, and Boswellia — optimized with a dual-absorption hemp
              and virgin coconut base.
            </span>
            <button
              className={styles.learnMoreBtn}
              onClick={handleLearnClick}
              disabled={learnLoading}
            >
              <span className={styles.label}>Learn More</span>
              {learnLoading ? (
                // Spinner SVG
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.spinner}
                >
                  <path d="M12 2v4" />
                  <path d="m16.2 7.8 2.9-2.9" />
                  <path d="M18 12h4" />
                  <path d="m16.2 16.2 2.9 2.9" />
                  <path d="M12 18v4" />
                  <path d="m4.9 19.1 2.9-2.9" />
                  <path d="M2 12h4" />
                  <path d="m4.9 4.9 2.9 2.9" />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
          <img src="/bottle.png" className={styles.bottleImg} />
        </div>

        <div className={styles.featureStrip}>
          <div className={styles.card01}>
            <span className={styles.text}>TRIPLE ACTION RELIEF</span>
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
              ? "The Vision Behind Dr. Vandy's"
              : isMobile
                ? "About Us"
                : "The Vision Behind Dr. Vandy's"}
          </span>
          <span className={styles.subheadingText}>
            {!mounted
              ? "From Elite Athletes to Everyday Families - Care That Evolves With You."
              : isTablet
                ? ""
                : "From Elite Athletes to Everyday Families - Care That Evolves With You."}
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
            18 <span className={styles.specialStyling}>Therapeutic</span>{" "}
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
              <span className={styles.number}>18</span>
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
        <div className={styles.testimonialCtn} key={testimonialCurrentIndex}>
          <div className={styles.dotsContainer}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === testimonialCurrentIndex ? styles.activeDot : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <span className={styles.testimonial}>
            “{testimonials[testimonialCurrentIndex].quote}
          </span>
          <div className={styles.detailsCtn}>
            <span className={styles.name}>
              {testimonials[testimonialCurrentIndex].name}
            </span>
            <span className={styles.subDetails}>
              {testimonials[testimonialCurrentIndex].details}
            </span>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Dr. Vandy's",
            url: "https://drvandys.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://drvandys.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </div>
  );
};

export default LandingPage;

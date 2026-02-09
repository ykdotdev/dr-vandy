import { useEffect, useState } from 'react';
import styles from './InfoPageClient.module.css'
import { sizeMobile, sizeTablet } from '@/config/constants';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';

const InfoPageClient = () => {
    const isMobile = useMediaQuery({ query: `(max-width: ${sizeTablet})` });
      const [openIndex, setOpenIndex] = useState(null);
    
      const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
      };

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

  return (
    <div className={styles.infoWrapper}>
      <span className={styles.painIntroText}>
        When pain becomes a daily interruption, relief needs to be both
        effective and safe.
        <br />
        <br />
        <span className={styles.specificStyling}>
          Dr. Vandy&apos;s OrthoHemp Pain Relief Oil
        </span>{" "}
        is a clinically advanced, doctor-formulated topical oil designed to
        target pain at its source— muscles, joints, and deep tissues— without
        harsh chemicals or synthetic painkillers.
      </span>

      <div className={styles.differentiationSection}>
        <span className={styles.sectionTitle}>
          What Makes OrthoHemp Different ?
        </span>

        <div className={styles.cardGrid}>
          <div className={styles.differentiationCard}>
            <span className={styles.heading}>
              Clinically Advanced Botanical Formulation
            </span>
            <span className={styles.detailsText}>
              OrthoHemp is not a generic pain oil. It is carefully formulated
              with CO₂ extracts and essential oils known for their
              anti-inflammatory, analgesic, and muscle-relaxing properties.
            </span>
          </div>

          <div className={styles.differentiationCard}>
            <span className={styles.heading}>CBD-Rich Vijaya Leaf Extract</span>
            <span className={styles.detailsText}>
              Traditionally used in Ayurvedic pain management, Vijaya Leaf
              Extract supports natural pain modulation without intoxication or
              dependency.
            </span>
          </div>

          <div className={styles.differentiationCard}>
            <span className={styles.heading}>Fast Absorbing, Non-Greasy</span>
            <span className={styles.detailsText}>
              Penetrates quickly into deep tissues without leaving a sticky
              residue—ideal for daily use.
            </span>
          </div>

          <div className={styles.differentiationCard}>
            <span className={styles.heading}>
              Clinically Advanced Botanical Formulation
            </span>
            <span className={styles.detailsText}>
              No steroids, parabens, silicones, or synthetic painkillers. Gentle
              on skin. Strong on pain.
            </span>
          </div>
        </div>
      </div>

      <div className={styles.howItWorksSection}>
        <span className={styles.sectionTitle}>How It Works ?</span>

        <div className={styles.stairs}>
          <div className={styles.stair}>
            <div className={styles.indicator}></div>
            <span className={styles.label}>
              Provides&nbsp;localized, targeted relief&nbsp;exactly where you
              apply it
            </span>
          </div>

          <div className={styles.stair}>
            <div className={styles.indicator}></div>
            <span className={styles.label}>
              Helps reduce&nbsp;inflammation and stiffness
            </span>
          </div>

          <div className={styles.stair}>
            <div className={styles.indicator}></div>
            <span className={styles.label}>
              Supports&nbsp;muscle relaxation
            </span>
          </div>

          <div className={styles.stair}>
            <div className={styles.indicator}></div>
            <span className={styles.label}>Improves&nbsp;joint mobility</span>
          </div>
        </div>
      </div>

      <div className={styles.suitableForSection}>
        <span className={styles.sectionTitle}>Suitable For</span>

        <div className={styles.tags}>
          <div className={styles.tag}>
            <span className={styles.label}>Muscle soreness &amp; spasms</span>
          </div>

          <div className={styles.tag}>
            <span className={styles.label}>Joint pain &amp; stiffness</span>
          </div>

          <div className={styles.tag}>
            <span className={styles.label}>Back, neck &amp; shoulder pain</span>
          </div>

          {mounted && isMobile && (
            <>
              <div className={styles.tag}>
                <span className={styles.label}>
                  Muscle soreness &amp; spasms
                </span>
              </div>

              <div className={styles.tag}>
                <span className={styles.label}>
                  Sports and workout recovery
                </span>
              </div>
            </>
          )}

          {mounted && !isMobile && (
            <div className={styles.bottomGrid}>
              <div className={styles.tag}>
                <span className={styles.label}>
                  Muscle soreness &amp; spasms
                </span>
              </div>

              <div className={styles.tag}>
                <span className={styles.label}>
                  Sports and workout recovery
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.ingredientsSection}>
        <span className={styles.sectionTitle}>
          Key Ingredients (Per 100 ml)
        </span>

        <ul className={styles.ingredientsList}>
          <li>Hemp Seed Oil</li>
          <li>Virgin Coconut Oil</li>
          <li>Almond Oil</li>
          <li>Arnica CO₂ Extract</li>
          <li>Boswellia (Frankincense) Oil</li>
          <li>Turmeric CO₂ Extract</li>
          <li>Eucalyptus Oil</li>
          <li>Ginger Oil</li>
          <li>Lavender Essential Oil</li>
          <li>Peppermint Essential Oil</li>
          <li>Rosemary Essential Oil</li>
          <li>Sweet Orange Oil</li>
          <li>Natural Menthol</li>
          <li>Natural Camphor</li>
          <li>Neem Oil</li>
          <li>Vijaya Leaf Extract (CBD-rich)</li>
          <li>Rosemary Extract</li>
          <li>Natural Vitamin E</li>
        </ul>
      </div>

      {mounted && isMobile && (
        <div className={styles.accordionsCtn}>
          <div
            className={clsx(
              styles.accordion,
              openIndex === 0 ? styles.active : "",
            )}
          >
            <button
              className={styles.headerCtn}
              onClick={() => {
                toggleAccordion(0);
              }}
            >
              <span className={styles.titleText}>How to Use</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx(styles.icon, styles.iconExpand)}
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx(styles.icon, styles.iconContract)}
              >
                <path d="M5 12h14" />
              </svg>
            </button>
            <div className={styles.contentCtn}>
              <p className={styles.contentText}>
                Ideal for joint pain, arthritis, muscle stiffness, nerve
                discomfort, sports recovery, and daily mobility support. Safe
                for long-term use and all age groups.
              </p>
            </div>
          </div>
          <div
            className={clsx(
              styles.accordion,
              openIndex === 1 ? styles.active : "",
            )}
          >
            <button
              className={styles.headerCtn}
              onClick={() => {
                toggleAccordion(1);
              }}
            >
              <span className={styles.titleText}>Key Ingredients</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx(styles.icon, styles.iconExpand)}
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx(styles.icon, styles.iconContract)}
              >
                <path d="M5 12h14" />
              </svg>
            </button>
            <div className={styles.contentCtn}>
              <p className={styles.contentText}>
                Ideal for joint pain, arthritis, muscle stiffness, nerve
                discomfort, sports recovery, and daily mobility support. Safe
                for long-term use and all age groups.
              </p>
            </div>
          </div>
          <div
            className={clsx(
              styles.accordion,
              openIndex === 2 ? styles.active : "",
            )}
          >
            <button
              className={styles.headerCtn}
              onClick={() => {
                toggleAccordion(2);
              }}
            >
              <span className={styles.titleText}>Who Is It For</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx(styles.icon, styles.iconExpand)}
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx(styles.icon, styles.iconContract)}
              >
                <path d="M5 12h14" />
              </svg>
            </button>
            <div className={styles.contentCtn}>
              <p className={styles.contentText}>
                Ideal for joint pain, arthritis, muscle stiffness, nerve
                discomfort, sports recovery, and daily mobility support. Safe
                for long-term use and all age groups.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.whyUsSection}>
        <span className={styles.sectionTitle}>Why Dr. Vandy&apos;s</span>
        <span className={styles.description}>
          Rooted in physiotherapy and clinical pain care, Dr. Vandy&apos;s
          focuses on understanding pain before treating it—bringing together
          science, tradition, and real-world experience.
        </span>
      </div>

      <span className={styles.certificationText}>
        Doctor-Formulated • GMP Certified • THC-Free
      </span>
    </div>
  );
}

export default InfoPageClient

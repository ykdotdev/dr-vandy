"use client";
import { useState } from "react";
import clsx from "clsx";
import Pillar from "./Pillar";
import styles from "./ExpandablePillars.module.css";
import Link from "next/link";

const ExpandablePillars = () => {
  const [expandedId, setExpandedId] = useState(null);

  const pillarsData = [
    {
      id: 1,
      label: "What Makes Our Relief Different",
      number: 1,
      description:
        "An overview of how pain relief formulations vary in composition, structure, and ingredient synergy. This section explores the role of botanical extracts, supporting oils, and formulation principles that influence topical effectiveness.",
    },
    {
    id: 3,
      label: "Understanding Pain & Relief",
      number: 3,
      description:"A broad look at common types of pain and their possible causes. This section helps identify patterns in discomfort and outlines general approaches used to support relief and recovery."},

    {
      id: 2,
      label: "How we understand pain",
      number: 2,
      description:
        "A clinical perspective on how pain develops and behaves within the body. It explains the interaction between muscles, joints, nerves, and inflammation, offering context to different pain experiences.",
    }
      ];

  const togglePillar = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <div className={styles.pillarsWrapper}>
        {pillarsData.map((pillar) => (
          <div key={pillar.id} className={styles.pillarItem}>
            <div
              className={clsx(
                styles.pillarButton,
                expandedId === pillar.id && styles.expanded,
              )}
              onClick={() => togglePillar(pillar.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  togglePillar(pillar.id);
                }
              }}
            >
              <Pillar label={pillar.label} number={pillar.number} />
            </div>

            {expandedId === pillar.id && (
              <div className={styles.contentBox}>
                <p className={styles.contentText}>{pillar.description}</p>
                <Link className={styles.cta} href="/blog">
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
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {expandedId && (
        <div className={styles.backdrop} onClick={() => setExpandedId(null)} />
      )}
    </>
  );
};

export default ExpandablePillars;

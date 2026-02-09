"use client";

import { useState } from "react";
import styles from "./FlipCard.module.css";

export function FlipCard({ icon, title, description }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={`${styles.flipper} ${isFlipped ? styles.flipped : ""}`}>
        {/* Front side */}
        <div className={`${styles.card} ${styles.front}`}>
          <div className={styles.icon}>{icon}</div>
          <h2 className={styles.title}>{title}</h2>
        </div>

        {/* Back side */}
        <div className={`${styles.card} ${styles.back}`}>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
}

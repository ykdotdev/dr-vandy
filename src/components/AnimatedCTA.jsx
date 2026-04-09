import { useRef } from "react";
import styles from "./AnimatedCTA.module.css";
import { useRouter } from "next/navigation";

const AnimatedCTA = () => {
  const router = useRouter();

  const btnRef = useRef(null);

  const handleClick = () => {
    const btn = btnRef.current;

    if (!btn.classList.contains(styles.animate)) {
      btn.classList.add(styles.animate);

      setTimeout(() => {
        router.push("/");
      }, 10000);
    }
  };

  return (
    <button ref={btnRef} onClick={handleClick} className={styles.order}>
      <span className={`${styles.text} ${styles.default}`}>Complete Order</span>

      <span className={`${styles.text} ${styles.success}`}>
        Done
        <svg viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1" />
        </svg>
      </span>

      <div className={styles.box} />

      <div className={styles.truck}>
        <div className={styles.back} />
        <div className={styles.front}>
          <div className={styles.window} />
        </div>
        <div className={`${styles.light} ${styles.top}`} />
        <div className={`${styles.light} ${styles.bottom}`} />
      </div>

      <div className={styles.lines} />
    </button>
  );
};

export default AnimatedCTA;

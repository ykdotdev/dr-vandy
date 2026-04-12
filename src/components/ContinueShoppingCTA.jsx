import clsx from 'clsx';
import styles from './ContinueShoppingCTA.module.css'
import Link from 'next/link';

const ContinueShoppingCTA = () => {

  return (
    <Link className={styles.CTA} href={"/products/orthohemp-oil"}>
      <span className={styles.ctaLabel}>Continue Shopping</span>
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
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </Link>
  );
}

export default ContinueShoppingCTA

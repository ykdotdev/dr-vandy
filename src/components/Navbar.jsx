import clsx from 'clsx';
import styles from './Navbar.module.css';
import { useEffect, useState } from "react";
import { sizeMobile } from '@/config/constants';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';

const Navbar = () => {
    const isMobile = useMediaQuery({ query: `(max-width: ${sizeMobile})` });
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);

  return (
    <div className={styles.navbar}>
      <h1 className={styles.logo}>Dr. Vandy’s™</h1>
      {mounted && (
        <div
          className={clsx(
            styles.navMenu,
            isMobile && styles.mobileNavMenu,
            isMobile && menuOpen && styles.open,
          )}
        >
          {/* Nav items */}
          <div className={styles.navItems}>
            <Link className={clsx(styles.navItem, styles.navItem01)} href='/blog'>Blogs</Link>
            <Link className={clsx(styles.navItem, styles.navItem02)} href='/about'>About</Link>
            <Link className={clsx(styles.navItem, styles.navItem03)} href='/contact'>Contact</Link>
          </div>

          {/* CTA */}
          <div className={styles.ctaContainer}>
            <button
              className={styles.ctaText}
              onClick={() => {
                router.push("/products/orthohemp-oil");
              }}
            >
              Buy Now
            </button>
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
          {/* Mobile toggle button */}
          {isMobile && (
            <button
              className={clsx(styles.navArrow, menuOpen && styles.open)}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation"
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
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar

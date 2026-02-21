import clsx from 'clsx';
import styles from './Navbar.module.css';
import { useEffect, useState } from "react";
import { sizeMobile } from '@/config/constants';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const isMobile = useMediaQuery({ query: `(max-width: ${sizeMobile})` });
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);
    const [loading, setLoading] = useState(false);
    
      const handleClick = () => {
        setLoading(true); // start loading (never ends)
        router.push(`/products/orthohemp-oil`);
      };

  return (
    <div className={styles.navbar}>
      <Link href={"/"}>
        <div className={styles.logoWrapper}>
          <Image
            width={600}
            height={150}
            src={"/logoPrimary.svg"}
            alt="logo"
            className={styles.logo}
          />
        </div>
      </Link>
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
            <Link
              className={clsx(styles.navItem, styles.navItem01)}
              href="/blog"
            >
              Blogs
            </Link>
            <Link
              className={clsx(styles.navItem, styles.navItem02)}
              href="/about"
            >
              About
            </Link>
            <Link
              className={clsx(styles.navItem, styles.navItem03)}
              href="/contact"
            >
              Contact
            </Link>
          </div>

          {/* CTA */}
          <button
            className={styles.ctaContainer}
            href="/products/orthohemp-oil"
            onClick={handleClick}
            disabled={loading}
          >
            <span className={styles.ctaText}>Buy Now</span>
            {loading ? (
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
            )}
          </button>
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

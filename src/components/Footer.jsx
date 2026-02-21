import clsx from 'clsx';
import styles from './Footer.module.css'
import { useEffect, useState } from 'react';
import { sizeTablet } from '@/config/constants';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    const isTablet = useMediaQuery({ query: `(max-width: ${sizeTablet})` });

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);
  return (
    <footer className={styles.footer}>
      <div className={styles.topCtn}>
        <div className={styles.footerLogoCtn}>
          <Image
            width={600}
            height={150}
            src={"/logoSecondary.svg"}
            alt="logo"
            className={styles.logo}
          />
        </div>

        <div className={clsx(styles.footerColumn, styles.quickLinks)}>
          <span className={styles.heading}>Quick Links</span>
          <div className={styles.footerItems}>
            <Link className={styles.item} href="/contact">
              Contact Us
            </Link>
            <Link className={styles.item} href="/about">
              About Us
            </Link>
            <Link className={styles.item} href="/faq">
              FAQs
            </Link>
          </div>
        </div>

        <div className={styles.footerColumn}>
          <span className={styles.heading}>Resources</span>
          <div className={styles.footerItems}>
            <Link className={styles.item} href="/shipping-policy">
              Shipping Policy
            </Link>
            <Link className={styles.item} href="/return-policy">
              Return Policy
            </Link>
          </div>
        </div>

        <div className={styles.footerColumn}>
          <span className={styles.heading}>Get in Touch</span>
          <div className={styles.footerItems}>
            <a
              className={clsx(styles.item, styles.mail)}
              href="mailto:info@drvandys.com"
            >
              info@drvandys.com
            </a>
            <a className={styles.item} style={{ cursor: "default" }}>
              Dr. Vandy's Lab <br/> Regd. Office: 7/16, Ground Floor, Sector-2,
              Rajinder Nagar, Sahibabad, Ghaziabad, Uttar Pradesh - 201005,
              India
            </a>
          </div>
        </div>
      </div>

      <div className={styles.legalTerms}>
        <span className={styles.copyrightText}>
          © 2026 Dr. Vandy's. All right reserved
        </span>
        <div className={styles.boringCtn}>
          <a
            className={styles.label}
            onClick={() => {
              router.push("/privacy-policy");
            }}
          >
            Privacy Policy
          </a>
          <Link className={styles.label} href="/terms-of-usage">
            Terms of Usage
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer

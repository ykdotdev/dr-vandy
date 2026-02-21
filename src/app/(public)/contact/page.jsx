"use client"

import styles from './page.module.css'
import Footer from '@/components/Footer'
import BackBtn from '@/components/BackBtn'

const page = () => {
  return (
    <div className={styles.mainContainer}>
      <BackBtn />

      <div className={styles.contactCtn}>
        <div className={styles.header}>
          <span className={styles.heading}>Contact us</span>
          <span className={styles.subheading}>
            Get in touch with us for any enquiries and questions
          </span>
        </div>

        <div className={styles.detailsMap}>
          <div className={styles.details}>
            <div className={styles.item}>
              <span className={styles.title}>General inquiries</span>
              <a className={styles.content} href="mailto:info@drvandys.com">
                info@drvandys.com
              </a>
            </div>
            <div className={styles.item}>
              <span className={styles.title}>Contact Number</span>
              <a className={styles.content} href="tel:+919871801077">
                +91 9871801077
              </a>
            </div>
          </div>

          <div className={styles.mapCtn}>
            <div style={{ width: "100%" }}>
              <iframe
                title="Google Map"
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=7/16,%20sector-2,%20Rajinder%20Nagar+(Dr.%20Vandy's%20Lab)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            url: "https://drvandys.com/contact",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              email: "info@drvandys.com",
            },
          }),
        }}
      />
    </div>
  );
}

export default page

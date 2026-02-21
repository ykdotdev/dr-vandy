"use client"
import styles from './page.module.css'
import BackBtn from '@/components/BackBtn';

const page = () => {
  return (
    <>
      <BackBtn />
      <div className={styles.mainCtn}>
        <h1>About Us</h1>

        <div className={styles.contentWrapper}>
          <h2>About Our Founder</h2>

          <p>
            <strong>Dr. Vandana Tanwar</strong> is a highly experienced{" "}
            <strong>Sports Physiotherapist</strong> with over 15 years of
            hands-on clinical expertise in{" "}
            <strong>
              rehabilitation, sports injury management, movement science, and
              recovery therapy
            </strong>
            . She has worked closely with national and international athletes,
            including India’s Olympic shooting team, helping them recover
            effectively, enhance performance, and return stronger.
          </p>

          <h2>About Dr. Vandy's</h2>
          <p>
            <strong>Dr. Vandy’s</strong> was born from real-world clinical
            experience — understanding how everyday aches, pain relief,
            recovery, and long-term wellness are deeply connected. Her mission
            is simple: to make{" "}
            <strong>
              doctor-led, science-backed, and practical wellness solutions
            </strong>{" "}
            accessible not only to athletes, but to families and individuals who
            want to move better, feel better, and live healthier every day.
          </p>

          <h2>Built From Real Practice, Not Just Theory</h2>

          <p>
            This brand didn’t begin in a boardroom. It began through everyday
            conversations with patients.
          </p>

          <p>
            Dr. Vandana works closely with people across all age groups — active
            adults, growing children, women with evolving health needs, and
            elderly individuals managing mobility and age-related concerns.
            These real-world clinical interactions shape how we think, what we
            prioritize, and how we formulate our products.
          </p>

          <p>
            We see what people consistently struggle with. We understand what
            truly works in real life — and what doesn’t.
          </p>

          <h2>Practical. Clinical. Real-World.</h2>

          <p>
            Because our foundation comes from daily patient care and
            rehabilitation practice, our products are designed to be:
          </p>

          <ul>
            <li>Practical and easy to use in everyday life</li>
            <li>Structured around real physiological and recovery needs</li>
            <li>Safe for consistent, long-term application</li>
            <li>Focused on sustainable support — not short-term hype</li>
          </ul>

          <h2>A Brand That Grows With You</h2>

          <p>
            Health concerns evolve over time. An athlete’s recovery needs differ
            from a child’s development, a woman’s wellness journey, or an
            elderly individual’s mobility challenges.
          </p>

          <p>
            Our goal is to build thoughtful, clinically guided solutions across
            every life stage — grounded in professional physiotherapy
            experience, research-driven formulation, and a deep understanding of
            real human needs.
          </p>

          <p>
            <strong>This isn’t trend-driven wellness.</strong> It’s wellness
            shaped by everyday clinical practice — designed to support you at
            every stage of life.
          </p>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Your Brand",
            url: "https://drvandys.com/about",
            description: "Learn about Your Brand Name and what we do.",
          }),
        }}
      />
    </>
  );
}

export default page

"use client"; // ensures this component is client-only

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { id: 1, icon: "🔥", text: "Feature One" },
  { id: 2, icon: "⚡", text: "Feature Two" },
  { id: 3, icon: "💎", text: "Feature Three" },
];

export default function FeatureCard() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const items = itemsRef.current;

    // Pin the card while scrolling through all features
    gsap.to(cardRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // enough scroll space for 3 features
        pin: true,
        scrub: true,
      },
    });

    // Animate each feature item in sequence
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${i * 100}% top+=50`,
            end: `${i * 100 + 100}% top`,
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="feature-container">
      {/* Fixed Card */}
      <div ref={cardRef} className="feature-card">
        <div className="feature-card-icon">🌟</div>
        <h2 className="feature-card-title">Our Features</h2>
      </div>

      {/* Content */}
      <div className="feature-content">
        {features.map((f, i) => (
          <div
            key={f.id} // stable ID prevents SSR mismatch
            ref={(el) => (itemsRef.current[i] = el)}
            className="feature-item"
          >
            <span className="feature-item-icon">{f.icon}</span>
            <p className="feature-item-text">{f.text}</p>
          </div>
        ))}
      </div>

      {/* Plain CSS */}
      <style jsx>{`
        .feature-container {
          display: flex;
          position: relative;
          height: 300vh; /* enough scroll space for 3 features */
          padding: 50px;
        }

        .feature-card {
          width: 30%;
          position: sticky;
          top: 100px;
          height: 200px;
          background: #f0f0f0;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-right: 50px;
        }

        .feature-card-icon {
          font-size: 60px;
        }

        .feature-card-title {
          margin-top: 10px;
          font-size: 20px;
          font-weight: bold;
        }

        .feature-content {
          width: 70%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 100px;
          opacity: 0; /* initial hidden state for animation */
        }

        .feature-item-icon {
          font-size: 40px;
        }

        .feature-item-text {
          font-size: 24px;
        }
      `}</style>
    </div>
  );
}

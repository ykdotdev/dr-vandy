"use client";

import { useEffect, useRef, useState } from "react";

export default function WiserStarRating() {
  const [ready, setReady] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    if (window.wiserreview) {
      window.wiserreview.init();
    }

    // Watch for when WiserReview actually injects content into the div
  const observer = new MutationObserver(() => {
    const hasContent = divRef.current?.querySelector(
      '.wsr-star-rating, svg, img, [class*="star"], [class*="wsr"]',
    );
    if (hasContent) {
      setReady(true);
      observer.disconnect();
    }
  });

    if (divRef.current) {
      observer.observe(divRef.current, { childList: true, subtree: true });
    }

    // Fallback — show after 5s regardless
    const fallback = setTimeout(() => setReady(true), 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "90px", height: "36px" }}>
      {!ready && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "4px",
            background: "linear-gradient(90deg, #eee 25%, #ddd 37%, #eee 63%)",
            backgroundSize: "400% 100%",
            animation: "shimmer 1.2s infinite",
          }}
        />
      )}
      <div
        ref={divRef}
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.3s", position: 'absolute', }}
        data-pid="orthohemp-oil"
        data-id="69d91e00acdb29406906ae09"
        data-type="star_rating"
        className="wiser_review wsr_star_rating"
        data-platform="ecomm_star_rating"
      />
    </div>
  );
}

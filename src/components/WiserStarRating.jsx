"use client";

import { useEffect, useState } from "react";

export default function WiserReviewWidget() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.wiserreview) {
      window.wiserreview.init();
    }
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ position: "relative", width: "80px", height: "36px" }}>
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
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.3s" }}
        data-pid="orthohemp-oil"
        data-id="69d91e00acdb29406906ae09"
        data-type="star_rating"
        className="wiser_review wsr_star_rating"
        data-platform="ecomm_star_rating"
      />
    </div>
  );
}

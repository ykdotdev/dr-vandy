// components/WiserReviewWidget.jsx
"use client";

import { useEffect } from "react";

export default function WiserReviewWidget() {
  useEffect(() => {
    if (window.wiserreview) {
      window.wiserreview.init();
    }
  }, []);

  return (
    <div
      data-pid="orthohemp-oil"
      data-id="69d91e00acdb29406906ae09"
      data-type="star_rating"
      className="wiser_review wsr_star_rating"
      data-platform="ecomm_star_rating"
    />
  );
}

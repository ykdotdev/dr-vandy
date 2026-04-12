// components/WiserMainReview.jsx
"use client";

import { useEffect, useRef } from "react";

export default function WiserMainReview() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (window.wiserreview) {
            window.wiserreview.init();
          }
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }, // start loading 200px before it enters viewport
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div
        data-pid="orthohemp-oil"
        data-id="69d91fe79fbf4cd281c07d71"
        data-rich-snippet="true"
        data-type="main"
        className="wiser_review wsr_main"
        data-platform="ecomm_main"
      />
    </div>
  );
}

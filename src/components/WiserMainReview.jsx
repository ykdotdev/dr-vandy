"use client";

import { useEffect, useRef } from "react";

export default function WiserMainReview() {
  const ref = useRef(null);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (window.wiserreview) {
            window.wiserreview.init();
          }
          intersectionObserver.disconnect();
        }
      },
      { rootMargin: "400px" },
    );

    if (ref.current) intersectionObserver.observe(ref.current);

    // Only watch body classList changes, not entire DOM
    const bodyObserver = new MutationObserver(() => {
      if (!document.body.classList.contains("modal-sidepanel-open")) return;
      const popup = document.querySelector('[class*="sidepanel"]');
      if (!popup) {
        document.body.classList.remove("modal-sidepanel-open");
      }
    });

    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"], // ← only watch class changes on body itself
      subtree: false, // ← never watch the entire DOM tree
      childList: false,
    });

    return () => {
      intersectionObserver.disconnect();
      bodyObserver.disconnect();
    };
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

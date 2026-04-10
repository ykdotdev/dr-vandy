"use client"
import { useEffect } from "react";

export default function WiserPixelLoader() {
  useEffect(() => {
    console.log("SCRIPTING")
    const scriptId = "wiser-review-pixel";

    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src =
      "https://embed.wiserreview.com/pixel/reviewPixel.js?wsid=8qyq22jmnt0rlqn&t=1775832769814";
    script.defer = true;

    document.body.appendChild(script);
  }, []);

  return null;
}

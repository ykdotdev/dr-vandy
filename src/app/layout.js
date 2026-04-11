import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { CartProvider } from "@/context/CartContext";
import Loading from "./loading";
import { Suspense } from "react";
import WiserGlobalLoader from "@/components/WiserStarRating";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dr. Vandy's",
  description:
    "Our goal is to build thoughtful, clinically guided solutions across every life stage — grounded in professional physiotherapy experience, research-driven formulation, and a deep understanding of real human needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <main className="page-wrapper">
          <ToastProvider>
            <CartProvider>
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            </CartProvider>
          </ToastProvider>
          <Analytics />
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Dr. Vandy's",
              url: "https://drvandys.com",
            }),
          }}
        />
        <Script
          id="wiser-review-pixel"
          src="https://embed.wiserreview.com/pixel/reviewPixel.js?wsid=1l5olkmnt331bk&t=1775836718801"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

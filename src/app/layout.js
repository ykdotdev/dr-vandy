import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { CartProvider } from "@/context/CartContext";
import Loading from "./loading";
import { Suspense } from "react";
import { getSiteUrl } from "@/lib/siteUrl";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dr. Vandy's",
    template: "%s | Dr. Vandy's",
  },
  description:
    "Our goal is to build thoughtful, clinically guided solutions across every life stage — grounded in professional physiotherapy experience, research-driven formulation, and a deep understanding of real human needs.",
};

export default function RootLayout({ children }) {
  const organizationLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dr. Vandy's",
    url: siteUrl,
  });

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
            __html: organizationLd,
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

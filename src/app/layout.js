import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dr. Vandy's",
  description:
    "Our goal is to build thoughtful, clinically guided solutions across every life stage — grounded in professional physiotherapy experience, research-driven formulation, and a deep understanding of real human needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="page-wrapper">
          <ToastProvider>{children}</ToastProvider>
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
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dr. Vandy's",
  description:
    "Our goal is to build thoughtful, clinically guided solutions across every life stage — grounded in professional physiotherapy experience, research-driven formulation, and a deep understanding of real human needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1775137660493586');
fbq('track', 'PageView');`,
          }}
        />
      </head>
      <body className={inter.className}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{display:"none"}}
            src="https://www.facebook.com/tr?id=1775137660493586&ev=PageView&noscript=1"
          />
        </noscript>
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

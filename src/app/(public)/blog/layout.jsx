import { Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google";
import styles from "./layout.module.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://drvandys.com";

export const metadata = {
  metadataBase: new URL(siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl),
};

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-blog-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-blog-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-blog-mono",
  display: "swap",
});

export default function BlogLayout({ children }) {
  return (
    <div
      className={`${fraunces.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${styles.scope}`}
    >
      {children}
    </div>
  );
}

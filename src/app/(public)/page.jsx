import HomePageClient from "./HomePageClient";
import { getSiteUrl } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();

export const metadata = {
  title: "Natural Pain Relief & Plant-Based Care",
  description:
    "Doctor-formulated OrthoHemp™ pain relief oil with Vijaya leaf extract and therapeutic botanicals. Clinically guided wellness from Dr. Vandy's.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Dr. Vandy's",
    title: "Dr. Vandy's | Natural Pain Relief & Plant-Based Care",
    description:
      "Doctor-formulated relief for inflammation, stiffness, and everyday pain — grounded in physiotherapy and research.",
  },
};

export default function Page() {
  return <HomePageClient siteUrl={siteUrl} />;
}

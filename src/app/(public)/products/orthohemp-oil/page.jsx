import WiserMainReview from "@/components/WiserMainReview";
import MainPageClient from "./MainPageClient";
import { getSiteUrl } from "@/lib/siteUrl";

const productPath = "/products/orthohemp-oil";
const siteUrl = getSiteUrl();
const productCanonical = `${siteUrl}${productPath}`;

export const metadata = {
  title: "Orthohemp Pain Relief Oil",
  description:
    "Pain relief blend powered by Hemp Seed Oil, Vijaya Leaf Extract, Arnica CO₂, and Boswellia — optimized with a dual-absorption hemp and virgin coconut base.",
  alternates: {
    canonical: productCanonical,
  },
  openGraph: {
    type: "website",
    url: productCanonical,
    title: "Orthohemp Pain Relief Oil | Dr. Vandy's",
    description:
      "Pain relief blend powered by Hemp Seed Oil, Vijaya Leaf Extract, Arnica CO₂, and Boswellia.",
  },
};

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const pageStatus = params.i || 0;
  const base = getSiteUrl();
  const productUrl = `${base}${productPath}`;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Orthohemp Pain Relief Oil",
    image: `${siteUrl}/bannerBottle.png`,
    description:
      "Pain relief blend powered by Hemp Seed Oil, Vijaya Leaf Extract, Arnica CO₂, and Boswellia — optimized with a dual-absorption hemp and virgin coconut base.",
    brand: {
      "@type": "Brand",
      name: "Dr. Vandy's",
    },
    offers: {
      "@type": "AggregateOffer",
      url: productUrl,
      lowPrice: "449.25",
      highPrice: "3354.40",
      priceCurrency: "INR",
      offerCount: "3",
    },
  };

  return (
    <>
      <MainPageClient pageStatus={pageStatus} />
      <WiserMainReview/>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productLd),
        }}
      />
    </>
  );
}

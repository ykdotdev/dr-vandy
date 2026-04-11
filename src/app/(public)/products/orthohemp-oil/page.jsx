import Script from "next/script";
import ProductPageClient from "./MainPageClient";
import MainPageClient from "./MainPageClient";

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const pageStatus = params.i || 0;
  // console.log(pageStatus)

  return (
    <>
      <MainPageClient pageStatus={pageStatus} />
      <div
        data-pid="orthohemp-oil"
        data-id="69d91fe79fbf4cd281c07d71"
        data-rich-snippet="true"
        data-type="main"
        className="wiser_review wsr_main"
        data-platform="ecomm_main"
      ></div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Orthohemp Pain Relief Oil",
            image: "https://drvandys.com/bannerBottle.png",
            description:
              "Pain relief blend powered by Hemp Seed Oil, Vijaya Leaf Extract, Arnica CO₂, and Boswellia — optimized with a dual-absorption hemp and virgin coconut base.",
            brand: {
              "@type": "Brand",
              name: "Dr. Vandy's",
            },
            offers: {
              offers: {
                "@type": "AggregateOffer",
                url: "https://drvandys.com/product/orthohemp-oil",
                lowPrice: "449.25",
                highPrice: "3354.40",
                priceCurrency: "INR",
                offerCount: "3",
              },
            },
          }),
        }}
      />
      
    </>
  );
};

export default page;

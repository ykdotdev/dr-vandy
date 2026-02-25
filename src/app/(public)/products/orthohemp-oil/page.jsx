import ProductPageClient from "./MainPageClient";
import MainPageClient from "./MainPageClient";
import { supabaseServer } from "@/lib/supabaseServer";

const page = async ({searchParams}) => {
    const params = await searchParams;
    const pageStatus = params.i || 0;
    // console.log(pageStatus)
  const slug = "orthohemp-oil";
  const { data: product } = await supabaseServer
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
   const { data: variants } = await supabaseServer
     .from("product_variants")
     .select("*")
     .eq("product_id", product.id)
     .order("qty_in_pack", { ascending: true });
    
  // console.log("Variants Array", variants);
        


  return (
    <>
      <MainPageClient
        product={product}
        variants={variants}
        pageStatus={pageStatus}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Orthohemp Pain Relief Oil",
            image: "https://drvandys.com/bottle.png",
            description: "Pain relief blend powered by Hemp Seed Oil, Vijaya Leaf Extract, Arnica CO₂, and Boswellia — optimized with a dual-absorption hemp and virgin coconut base.",
            brand: {
              "@type": "Brand",
              name: "Dr. Vandy's",
            },
            offers: {
              "@type": "Offer",
              url: "https://drvandys.com/product/orthohemp-oil",
              priceCurrency: "INR",
              price: variants[0].price,
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
    </>
  ); 
}

export default page

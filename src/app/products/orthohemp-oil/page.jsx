// "use client";
import { supabase } from "@/lib/supabaseClient";
import ProductPageClient from "./ProductPageClient";

const page = async () => {
  const slug = "orthohemp-oil";
  console.log("hi")
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
   const { data: variants } = await supabase
     .from("product_variants")
     .select("*")
     .eq("product_id", product.id)
     .order("sort_order", { ascending: true });
    
  console.log(2, variants);
        
        
  return (
    <>
      <ProductPageClient product={product} variants={variants} />
    </>
  );
}

export default page

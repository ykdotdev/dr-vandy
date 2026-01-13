import { supabase } from "@/lib/supabaseClient";
import ProductPageClient from "./MainPageClient";

const page = async () => {
  const slug = "orthohemp-oil";
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
   const { data: variants } = await supabase
     .from("product_variants")
     .select("*")
     .eq("product_id", product.id)
     .order("qty_in_pack", { ascending: true });
    
  console.log("Variants Array", variants);
        


  return(
    <>
    <ProductPageClient product={product} variants={variants} />
    </>
  ); 
}

export default page

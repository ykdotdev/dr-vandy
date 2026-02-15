import { supabase } from "@/lib/supabaseClient";
import ProductPageClient from "./MainPageClient";
import MainPageClient from "./MainPageClient";

const page = async ({searchParams}) => {
    const params = await searchParams;
    const pageStatus = params.i || 0;
    // console.log(pageStatus)
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
    
  // console.log("Variants Array", variants);
        


  return(
    <>
    <MainPageClient product={product} variants={variants} pageStatus={pageStatus}/>
    </>
  ); 
}

export default page

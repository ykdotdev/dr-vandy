// "use client";
import CheckoutClient from './CheckoutClient';
import { supabase } from '@/lib/supabaseClient';

const page = async ({searchParams}) => {
  const params = await searchParams;
  const qtyFromParams = params.qty;
  // const variant=params.v_id;
  const { data: variant} = await supabase
       .from("product_variants")
       .select("*")
       .eq("id", params.v_id);
  return (
    <CheckoutClient variant={variant} qty={qtyFromParams} amount={variant[0].price}/>
  )
}

export default page

import React from 'react'
import CheckoutClient from '../checkoutUI/CheckoutClient'
import { supabase } from '@/lib/supabaseClient';

const page = async ({searchParams}) => {
  const params = await searchParams;
  const qtyFromParams = params.qty;
  // const variant=params.v_id;
  const { data: variant} = await supabase
       .from("product_variants")
       .select("*")
       .eq("id", params.v_id)
       .maybeSingle();
    const { data: product } = await supabase
      .from("products")
      .select("*")
      .eq("id", variant?.product_id)
      .maybeSingle();

       console.log("2: ", product, variant)
  return (
    <CheckoutClient product={product} variant={variant} qty={qtyFromParams} amount={variant?.price}/>
  )
}

export default page

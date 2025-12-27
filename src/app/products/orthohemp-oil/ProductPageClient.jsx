"use client";
import styles from "./page.module.css";
import {useState} from 'react';
import { useRouter } from "next/navigation";

const ProductPageClient = ({product, variants}) => {
    const router=useRouter();
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [currentQty, setCurrentQty] = useState(0);

//   console.log(selectedVariant)

  return (
    <div>
        <h1>{selectedVariant.variant_name}</h1>
      <div className="btn-group">
        {variants.map((variant, i)=>{
            return (<div key={i}>
                <input type="radio" id={`variant-${variant.variant_name}`} name="variant-choice" value={variant.variant_name} checked={selectedVariant.id === variant.id} onChange={()=> setSelectedVariant(variant)}/>
                <label htmlFor={`variant-${variant.variant_name}`}>{variant.variant_name}</label>
            </div>)
        })}
        </div>
        <button className={styles.buyBtn} onClick={()=>{setCurrentQty(currentQty+1)}}>{currentQty}</button>
        <button className={styles.buyBtn} onClick={()=>{router.push(`/checkout?v_id=${selectedVariant.id}&qty=${currentQty}`)}}>BUY</button> v_id = Variant ID
    </div>
  )
}

export default ProductPageClient
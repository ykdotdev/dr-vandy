import styles from './InventoryClient.module.css'
import clsx from 'clsx';
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';



const InventoryClient = () => {
  const router = useRouter();
  const product_id = "9bc79877-98df-4831-b697-4650b8481804"; //Orthohemp Oil
  const [variantsData, setVariantsData] = useState([]);

  useEffect(()=>{
     const getVariants = async()=>{
        const { data: variants } = await supabase
     .from("product_variants")
     .select("*")
     .eq("product_id", product_id)
     .order("qty_in_pack", { ascending: true });
        setVariantsData(variants)
        variants.map((variant)=>{
            console.log(variant)
        });
     }
     getVariants()
    }, [])
  console.log(variantsData)
  return (
    <div className={styles.mainInventoryCtn}>
      <div className={styles.pageHeader}>
        <div className={styles.itemDetailsCtn}>
          <div className={styles.imageCtn}>
            <img
              className={styles.productImage}
              src="/transparent.png"
              alt="Product"
            />
          </div>
          <div className={styles.textCtn}>
            <span className={styles.productTitle}>
              Dr. Vandy’s OrthoHemp™ <br /> Pain Relief Oil
            </span>
          </div>
        </div>
        <span className={styles.descriptionText}>
          Fast Relief • Reduces Inflammation • Improves Mobility
        </span>
      </div>
      <div className={styles.variantCards}>
        {console.log(2)}
        {variantsData.map((variant, index) => (
          <div className={styles.variantCard} key={index}>
            <div className={styles.header}>
              <span className={styles.variantName}>{variant.variant_name}</span>
              <button
                className={styles.editBtn}
                onClick={() => {
                  router.push(`/admin/variant/${variant.id}`);
                }}
              >
                Edit Details
              </button>
            </div>
            <div className={styles.variantDetailsCtn}>
              <div className={styles.detailRow}>
                <span className={styles.label}>Retail Price</span>
                <span className={styles.value}>₹{variant.price}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>MRP</span>
                <span className={styles.value}>₹{variant.mrp}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Weight</span>
                <span className={styles.value}>{variant.weight}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Quantity in Pack</span>
                <span className={styles.value}>{variant.qty_in_pack}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Dimensions (lxbxh)</span>
                <span className={styles.value}>{variant.dimensions}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Current Stock</span>
                <span className={styles.value}>{variant.current_stock}</span>
              </div>
              <div className={clsx(styles.detailRow, styles.reservedStockRow)}>
                <div className={styles.labelInfoCtn}>
                  <span className={styles.label}>Reserved Stock</span>
                  <div className={styles.infoBtn}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.icon}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                  </div>
                </div>
                <span className={styles.value}>{variant.reserved_stock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InventoryClient

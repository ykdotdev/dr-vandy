"use client";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ToastProvider";

const Page = () => {
  const { showToast } = useToast();
  const params = useParams();
  const { variantID } = params;

  // state for inputs
  const [stock, setStock] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [mrp, setMrp] = useState("");

  const handleClick = async (type, value) => {
    let updateObj = {};

    if (type === "stock") updateObj.current_stock = value;
    if (type === "sellingPrice") updateObj.price = value;
    if (type === "mrp") updateObj.mrp = value;

    const { data, error } = await supabase
      .from("product_variants")
      .update(updateObj)
      .eq("id", variantID)
      .select();

    if (error) {
      console.error(error);
      showToast("Error Please Retry", "error");
      return;
    }

    console.log(data);
    showToast("Updated Successfully", "success");
    
  };

  return (
    <div className={styles.mainCtn}>
      <span className={styles.heading}>Edit name details</span>

      <div className={styles.contentGrid}>
        {/* STOCK */}
        <form
          className={styles.row}
          onSubmit={(e) => {
            e.preventDefault();
            handleClick("stock", stock);
          }}
        >
          <label className={styles.label} htmlFor="stock">
            Stock
          </label>

          <div className={styles.wrapper}>
            <input
              className={styles.input}
              type="number"
              id="stock"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />

            <button className={styles.submit} type="submit">
              Update
            </button>
          </div>
        </form>

        {/* SELLING PRICE */}
        <form
          className={styles.row}
          onSubmit={(e) => {
            e.preventDefault();
            handleClick("sellingPrice", sellingPrice);
          }}
        >
          <label className={styles.label} htmlFor="sellingPrice">
            Selling Price
          </label>

          <div className={styles.wrapper}>
            <input
              className={styles.input}
              type="number"
              id="sellingPrice"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
            />

            <button className={styles.submit} type="submit">
              Update
            </button>
          </div>
        </form>

        {/* MRP */}
        <form
          className={styles.row}
          onSubmit={(e) => {
            e.preventDefault();
            handleClick("mrp", mrp);
          }}
        >
          <label className={styles.label} htmlFor="mrp">
            M.R.P.
          </label>

          <div className={styles.wrapper}>
            <input
              className={styles.input}
              type="number"
              id="mrp"
              value={mrp}
              onChange={(e) => setMrp(e.target.value)}
            />

            <button className={styles.submit} type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;

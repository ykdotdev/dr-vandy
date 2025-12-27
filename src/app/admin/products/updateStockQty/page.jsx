"use client";
import styles from "./page.module.css";
import { supabase } from "@/lib/supabaseClient";

export default function AddProductPage() {
  const updateStockQty = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const product_id = parseInt(formData.get("product_id"));
    const stock_qty = parseInt(formData.get("stock_qty"));
    const active_state = formData.get("active_state") == "on" ? "true" : "false";
    const { data, error } = await supabase
      .from("products")
      .update({stock_qty, active_state})
      .eq("product_id", product_id);

    if (error) {
      console.log(error);
    } else {
      console.log("Updated", active_state);
    }
  };
    

    

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={updateStockQty}>
        <label>Product ID</label>
        <br />
        <input name="product_id" type="text" required />
        <br />
        <label>Stock QTY</label>
        <br />
        <input name="stock_qty" type="numeric" required />
        <br />
        <label>Active State</label>
        <br />
        <input name="active_state" type="checkbox" />
        <br />
        <button className={styles.buyBtn} type="submit">
          Update Stock
        </button>
      </form>
    </div>
  );
}

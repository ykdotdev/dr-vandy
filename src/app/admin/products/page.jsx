// "use client";
import styles from "./page.module.css";
import { supabase } from "@/lib/supabaseClient";

export default async function AddProductPage() {
  const p = [];
  const {data, error} = await supabase
    .from("products")
    .select("*");

    if (error) {
    console.error("ERROR", error);
    } else {
    console.log("Read", data);
    data.map((i)=>{
      p.push(i);
    });
    }

    

  return (
    <div>
      <h1>Add Product</h1>

      <div className={styles.productTable}>
        {p.map((p, i) => (
          <div key={i} className={styles.productCtn}>
            {/* PRODUCT ID */}
            <span className={styles.productID}>Product ID={p.product_id}</span>
            {/* NAME + SLUG */}
            <div className={styles.textBox}>
              <h3 className={styles.productName}>{p.name}</h3>
              <p className={styles.productSlug}>{p.slug}</p>
              <p className={styles.productDescription}>{p.description}</p>
              {/* <-- keeping this one as <p> because it's a description */}
            </div>

            {/* PRICING */}
            <div className={styles.priceBox}>
              <span className={styles.discountedPrice}>
                ₹{p.discounted_price}
              </span>
              <span className={styles.originalPrice}>₹{p.price}</span>
            </div>

            {/* STOCK */}
            <div className={styles.stockBox}>
              <span>Stock: {p.stock_qty}</span>
            </div>

            {/* WEIGHT + DIMENSIONS */}
            <div className={styles.metaBox}>
              <span>Weight: {p.weight} kg</span>
              <span>Dim: {p.dimensions}</span>
            </div>

            {/* IMAGE */}
            <div className={styles.imageBox}>
              {Object.values(JSON.parse(p.image_url)).map((image, index) => {
                console.log(image);
                <img src={image} alt={p.name} />;
              })}
            </div>

            {/* STATUS */}
            <div className={styles.statusBox}>
              <span
                className={p.active_state ? styles.active : styles.inactive}
              >
                {p.active_state ? "Active" : "Inactive"}
              </span>
            </div>

            {/* ACTION */}
            {/* <div className={styles.actionBox}>
              <a href={`/admin/products/${p.id}`}>
                <button className={styles.editBtn}>Edit</button>
              </a>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import styles from "./page.module.css";
import { supabase } from "@/lib/supabaseClient";

export default function AddProductPage() {
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const dataObj = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      discounted_price: parseFloat(formData.get("discounted_price")),
      weight: parseFloat(formData.get("weight")),
      dimensions: formData.get("dimensions"),
      image_url: formData.get("image_url"),
      stock: parseInt(formData.get("stock")),
      active: formData.get("active") === "on",
    };
    const {data, error} = await supabase
    .from("products")
    .insert([dataObj]);

    if (error) {
    console.error("ERROR", error);
    } else {
    console.log("pushed", dataArray);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <br />
        <input name="name" type="text" required />
        <br />
        <br />

        <label>Slug</label>
        <br />
        <input name="slug" type="text" required />
        <br />
        <br />

        <label>Description</label>
        <br />
        <textarea name="description" required></textarea>
        <br />
        <br />

        <label>Price (MRP)</label>
        <br />
        <input name="price" type="number" step="0.01" required />
        <br />
        <br />

        <label>Discounted Price</label>
        <br />
        <input name="discounted_price" type="number" step="0.01" required />
        <br />
        <br />

        <label>Weight (kg)</label>
        <br />
        <input name="weight" type="number" step="0.01" required />
        <br />
        <br />

        <label>Dimensions</label>
        <br />
        <input name="dimensions" type="text" required />
        <br />
        <br />

        <label>Image URL</label>
        <br />
        <input name="image_url" type="text" required />
        <br />
        <br />

        <label>Stock</label>
        <br />
        <input name="stock" type="number" required />
        <br />
        <br />

        <label>Active</label>
        <input name="active" type="checkbox" />
        <br />
        <br />

        <button className={styles.buyBtn} type="submit">Save Product</button>
      </form>
    </div>
  );
}

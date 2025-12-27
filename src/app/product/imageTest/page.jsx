// "use client";
import styles from "./page.module.css";
import { supabase } from "@/lib/supabaseClient";

export default async function AddProductPage() {
  const p = [];
  const requestedProductId = 2;
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
      <h1>IMAGE</h1>
      {p.forEach((product)=>{
        let flag=false;
        let pushJSX;
        if (product.product_id == requestedProductId) {
          console.log(JSON.parse(product.image_url));
          Object.values(JSON.parse(product.image_url)).map((imageURL, i) => {
            console.log(imageURL)
            pushJSX += `
              <img key={i} src={imageURL} className={styles.imageCtn} />
            `;
            flag = true;
          });
        }
          console.log("push", pushJSX)
          return pushJSX;
      })}
      
    </div>
  );
}

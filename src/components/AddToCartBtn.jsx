import { addToCart } from "@/lib/cart";
import styles from "./AddToCartBtn.module.css";
import { useState } from "react";
import clsx from "clsx";

const AddToCartBtn = ({ variant_id, quantity }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (clicked) return;

    addToCart(variant_id, quantity);

    setClicked(true);

    setTimeout(() => {
      setClicked(false);
    }, 1200);
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(styles.CTA, clicked && styles.active)}
    >
      {!clicked && (
        <>
          <span className={styles.label}>Add to Cart</span>
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
            {" "}
            <path d="M16 10a4 4 0 0 1-8 0" /> <path d="M3.103 6.034h17.794" />{" "}
            <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />{" "}
          </svg>
        </>
      )}

      {clicked && (
        <svg className={styles.check} viewBox="0 0 24 24">
          <path d="M5 12l5 5L20 7" />
        </svg>
      )}
    </button>
  );
};

export default AddToCartBtn;

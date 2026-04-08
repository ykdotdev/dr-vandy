import { addToCart } from '@/lib/cart';
import styles from './AddToCartBtn.module.css';

const AddToCartBtn = ({variant_id, quantity}) => {
    

    const handleClick = () => {
      addToCart(variant_id, quantity);
    };
  return (
    <></>

    // <button
    //   onClick={handleClick}
    //   className={styles.CTA}
    // >
    //   <span className={styles.label}>{loading ? "Checking" : "label"}</span>
    //   {loading ? (
    //     // Spinner SVG
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       className={styles.spinner}
    //     >
    //       <path d="M12 2v4" />
    //       <path d="m16.2 7.8 2.9-2.9" />
    //       <path d="M18 12h4" />
    //       <path d="m16.2 16.2 2.9 2.9" />
    //       <path d="M12 18v4" />
    //       <path d="m4.9 19.1 2.9-2.9" />
    //       <path d="M2 12h4" />
    //       <path d="m4.9 4.9 2.9 2.9" />
    //     </svg>
    //   ) : (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       className={styles.icon}
    //     >
    //       <circle cx="12" cy="12" r="10" />
    //       <path d="m12 16 4-4-4-4" />
    //       <path d="M8 12h8" />
    //     </svg>
    //   )}
    // </button>
  );
}

export default AddToCartBtn

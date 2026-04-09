import { useCartCount } from '@/context/CartContext';
import styles from './CartBtn.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const CartBtn = () => {
    const {count} = useCartCount();
    const [animate, setAnimate] = useState(false);

    useEffect((()=>{
      if (count===0) return;
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 200); // match css animation duration

      return () => clearTimeout(timer);
    }), [count])

  return (
    <Link className={clsx(styles.cartBtn, animate && styles.animate)} href={"/test"}>
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
        <path d="M16 10a4 4 0 0 1-8 0" />
        <path d="M3.103 6.034h17.794" />
        <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
      </svg>

      <div className={styles.countBadge}>{count}</div>
    </Link>
  );
}

export default CartBtn

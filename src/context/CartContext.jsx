"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "@/lib/cart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCount(total);
  };

  useEffect(() => {
    updateCount();

    // 🔥 listen for custom event
    window.addEventListener("cartUpdated", updateCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  return (
    <CartContext.Provider value={{ count }}>{children}</CartContext.Provider>
  );
};

export const useCartCount = () => useContext(CartContext);

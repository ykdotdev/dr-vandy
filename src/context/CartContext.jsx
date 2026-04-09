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

  const handleStorage = (e) => {
    if (e.key === "cart") {
      updateCount();
    }
  };

  window.addEventListener("cartUpdated", updateCount);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener("cartUpdated", updateCount);
    window.removeEventListener("storage", handleStorage);
  };
}, []);

  return (
    <CartContext.Provider value={{ count }}>{children}</CartContext.Provider>
  );
};

export const useCartCount = () => useContext(CartContext);

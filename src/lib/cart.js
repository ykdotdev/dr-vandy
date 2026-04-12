const CART_KEY = "cart";

// Get cart safely
export const getCart = () => {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
};

// Set cart + trigger update
export const setCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  // trigger update everywhere
  window.dispatchEvent(new Event("cartUpdated"));
};

// Add to cart
export const addToCart = (variantId, quantity) => {
  const cart = getCart();

  const existing = cart.find((item) => item.variantId === variantId);

  if (existing) {
      existing.quantity += quantity;
  } else {
    cart.push({ variantId, quantity: quantity });
  }

  setCart(cart);
};

// Remove item
export const removeFromCart = (variantId) => {
  const cart = getCart().filter((item) => item.variantId !== variantId);
  setCart(cart);
};

// Update quantity
export const updateCart = (variantId, quantity) => {
  const cart = getCart().map((item) =>
    item.variantId === variantId
      ? { ...item, quantity: Math.max(1, quantity) } // prevent 0/negative
      : item,
  );

  setCart(cart);
};

// Optional: clear cart
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
};

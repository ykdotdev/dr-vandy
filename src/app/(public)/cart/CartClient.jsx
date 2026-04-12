"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import clsx from "clsx";
import BackBtn from "@/components/BackBtn";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ToastProvider";
import Image from "next/image";
import { shopifyFetch } from "@/lib/shopify";
import { GET_VARIANTS_BY_IDS } from "@/lib/queries";
import { getCart, removeFromCart, updateCart } from "@/lib/cart";
import ContinueShoppingCTA from "@/components/ContinueShoppingCTA";

const CartClient = () => {
  const MAX_QTY = 9;
  const [lineItems, setLineItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutBtnLoading, setisCheckoutBtnLoading] = useState(false);
  useEffect(() => {
    const fetchCart = async () => {
      if (lineItems.length === 0) setIsLoading(true);
      const cart = getCart();

      const ids = cart.map((item) => item.variantId);

      if (ids.length === 0) {
        setIsLoading(false);
        return;
      }

      const data = await shopifyFetch(GET_VARIANTS_BY_IDS, {
        ids,
      });
      const items = data.nodes.map((v) => {
        const cartItem = cart.find((i) => i.variantId === v.id);

        return {
          id: v.id,
          product_name: v.product.title,
          variant_name: v.title,
          price: Number(v.price?.value),
          mrp: Number(v.mrp.amount),
          quantity: cartItem.quantity,
          available_for_sale: v.availableForSale ? true : false,
          shipping_status: v.shipping_status?.value || "5-10",
          image: v.image?.url || null,
        };
      });
      // console.log("MY DATA", items);

      setLineItems(items);
      setIsLoading(false);
    };

    fetchCart();
  }, [lineItems.length]);

  // console.log(lineItems);
  const router = useRouter();
  const { showToast } = useToast();
  const [isDisabled, setIsDisabled] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [totals, setTotals] = useState({
    subtotalMRP: 0, //price*qty
    subtotalSelling: 0,
    discountAmount: 0,
    discountPercent: 0,
    finalTotal: 0,
  });

  // console.log(lineItems);

  const updateQuantity = (id, newQty) => {
    setLineItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item,
      ),
    );
    updateCart(id, newQty);
  };

  const removeItem = (variant_id) => {
    setLineItems((prev) =>
      prev.filter((item, index) => item.id !== variant_id),
    );
    removeFromCart(variant_id);
  };
  useEffect(() => {
    const calculateCartTotals = () => {
      let subtotalMRP = 0;
      let subtotalSelling = 0;

      lineItems.forEach((item) => {
        subtotalMRP += item.mrp * item.quantity;
        subtotalSelling += item.price * item.quantity;
      });

      const discountAmount = subtotalMRP - subtotalSelling;

      const discountPercent =
        subtotalMRP > 0 ? ((discountAmount / subtotalMRP) * 100).toFixed(2) : 0;
      setTotals({
        subtotalMRP,
        subtotalSelling,
        discountAmount,
        discountPercent,
        finalTotal: subtotalSelling,
      });
    };
    // console.log("totals", totals);

    calculateCartTotals();
    setItemCount(0);
    lineItems.forEach((item) => {
      // console.log("COUNT", item);
      setItemCount((prev) => prev + item.quantity);
    });
  }, [lineItems]);

  const handleCheckout = async () => {
    try {
      setisCheckoutBtnLoading(true);
      const res = await fetch("/api/cart/create", {
        method: "POST",
        body: JSON.stringify({
          lineItems: lineItems.map((item) => ({
            quantity: Number(item.quantity),
            merchandiseId: String(item.id),
          })),
        }),
      });
      const data = await res.json();
      // console.log("CART CHECKOUT", data);
      if (data?.data?.cartCreate?.cart?.checkoutUrl) {
        const checkoutUrl = data?.data?.cartCreate?.cart?.checkoutUrl;
        // console.log(checkoutUrl);
        window.location.href = checkoutUrl;
        setisCheckoutBtnLoading(false);

      } else {
        
        showToast("Something went wrong!", "error");
        setisCheckoutBtnLoading(false);
      }
      return;


    } catch (err) {
      setisCheckoutBtnLoading(false);
    }
  };

  return (
    <div className={styles.layoutFrame}>
      <div className={styles.leftCtn}>
        <div className={styles.cartModal}>
          <div className={styles.cartHeader}>
            <span className={styles.cartTitle}>Dr. Vandy's Lab</span>
            <div className={styles.itemDetails}>
              <span className={styles.title}>Your Cart</span>
              <span className={styles.subTitle}>
                Your wellness essentials, all in one place.
              </span>
            </div>
          </div>
          <div className={styles.cartWrapper}>
            {isLoading ? (
              <div className={styles.loadWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.loadIcon}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </div>
            ) : lineItems.length === 0 ? (
              <div className={styles.noItemCtn}>
                <span className={styles.noItemText}>No items in your cart</span>
              </div>
            ) : (
              <div className={styles.cartItems}>
                {lineItems.map((item, index) => (
                  <div className={clsx(styles.itemCard)} key={item.id}>
                    <div className={styles.imageCtn}>
                      {item.image ? (
                        <Image
                          src={item.image}
                          className={styles.image}
                          alt={item.product_name || "Product in cart"}
                          width={100}
                          height={150}
                          sizes="100px"
                          quality={75}
                          priority={index < 3}
                        />
                      ) : (
                        <div
                          className={styles.cartThumbPlaceholder}
                          aria-hidden
                        />
                      )}
                    </div>
                    <div className={styles.contentCtn}>
                      <div className={styles.header}>
                        <div className={styles.itemDetails}>
                          <div className={styles.nameBadge}>
                            <span className={styles.title}>
                              {item.product_name}
                            </span>
                            {/* <div className={styles.badge}>
                            <span className={styles.label}>Most Popular</span>
                          </div> */}
                          </div>
                          <span className={styles.subTitle}>
                            | {item.variant_name}
                          </span>
                        </div>
                        {item.available_for_sale === true ? (
                          <div className={styles.pricingQuantityCtn}>
                            <span className={styles.price}>₹{item.price}</span>

                            <div className={styles.quantityCtn}>
                              <button
                                className={clsx(
                                  styles.iconBtn,
                                  styles.iconBtnMinus,
                                  item.quantity >= 1 ? styles.isActive : "",
                                )}
                                onClick={() => {
                                  item.quantity > 1
                                    ? updateQuantity(item.id, item.quantity - 1)
                                    : removeItem(item.id);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className={clsx(styles.icon)}
                                >
                                  <circle cx="12" cy="12" r="10" />
                                  <path d="M8 12h8" />
                                </svg>
                              </button>
                              <span className={styles.quantityText}>
                                {item.quantity}
                              </span>
                              <button
                                className={clsx(
                                  styles.iconBtn,
                                  styles.iconBtnPlus,
                                  item.quantity < MAX_QTY
                                    ? styles.isActive
                                    : "",
                                )}
                                disabled={item.quantity >= MAX_QTY}
                                onClick={() => {
                                  updateQuantity(item.id, item.quantity + 1);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className={clsx(styles.icon)}
                                >
                                  <circle cx="12" cy="12" r="10" />
                                  <path d="M8 12h8" />
                                  <path d="M12 8v8" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className={styles.outOfStockCtn}>
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
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" x2="12" y1="8" y2="12" />
                              <line x1="12" x2="12.01" y1="16" y2="16" />
                            </svg>
                            <span className={styles.text}>Out of Stock</span>
                          </div>
                        )}
                      </div>
                      <div className={styles.cardFooter}>
                        <div className={styles.textWrapper}>
                          <span className={styles.text}>
                            The item will be delivered within{" "}
                            {item.shipping_status} business days.
                          </span>
                        </div>
                        <button
                          className={styles.removeBtn}
                          onClick={() => {
                            removeItem(item.id);
                          }}
                        >
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
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                            <path d="M3 6h18" />
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.rightCtn}>
        {isLoading ? (
          <div className={styles.loadWrapper}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.loadIcon}
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </div>
        ) : lineItems.length === 0 ? (
          <div className={styles.continueShoppingCtn}>
            <div className={styles.imageCtn}>
              <Image
                src="/bag.svg"
                alt="Empty cart"
                className={styles.image}
                width={120}
                height={120}
                unoptimized
              />
            </div>
            <ContinueShoppingCTA />
          </div>
        ) : (
          <div className={styles.paymentModal}>
            <div className={styles.orderSummary}>
              <span className={styles.heading}>Order Summary</span>
              <div className={styles.billingCtn}>
                <div className={styles.pricingBreakdownCtn}>
                  <div
                    className={clsx(styles.pricingRow, styles.netPricingCtn)}
                  >
                    <span className={styles.chargeLabel}>
                      {itemCount} Items
                    </span>
                    <span
                      className={clsx(styles.priceValue, styles.subtotalValue)}
                    >
                      ₹{totals.subtotalMRP.toFixed(2)}
                    </span>
                  </div>

                  <div className={clsx(styles.pricingRow, styles.taxCtn)}>
                    <span className={styles.chargeLabel}>Tax</span>
                    <span className={styles.priceValue}>Inclusive</span>
                  </div>
                  <div className={clsx(styles.pricingRow, styles.discountCtn)}>
                    <span className={styles.chargeLabel}>
                      Discount (-{Math.round(totals.discountPercent)}%)
                    </span>
                    <span className={styles.discountValue}>
                      -₹{totals.discountAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className={styles.totalCtn}>
                  <span className={styles.totalLabel}>Total due:</span>
                  <span className={styles.totalAmount}>
                    ₹{totals.subtotalSelling.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* PAY CTA */}
            <button
              className={clsx(
                styles.checkoutCTA,
                isCheckoutBtnLoading && styles.disabled,
              )}
              disabled={isCheckoutBtnLoading}
              onClick={handleCheckout}
            >
              <span className={styles.ctaLabel}>Proceed to Checkout</span>

              {isCheckoutBtnLoading ? (
                // Spinner SVG
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.spinner}
                >
                  <path d="M12 2v4" />
                  <path d="m16.2 7.8 2.9-2.9" />
                  <path d="M18 12h4" />
                  <path d="m16.2 16.2 2.9 2.9" />
                  <path d="M12 18v4" />
                  <path d="m4.9 19.1 2.9-2.9" />
                  <path d="M2 12h4" />
                  <path d="m4.9 4.9 2.9 2.9" />
                </svg>
              ) : (
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
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartClient;

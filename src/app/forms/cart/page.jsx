"use client";
import { useState } from "react";
import styles from "./page.module.css";
import clsx from "clsx";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";

const page = () => {

  const cartSchema = z.object({
    pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
    promo: z.string().optional()
  })

    const MIN_QTY = 1;
    const MAX_QTY = 9;

      const [currentQty, setCurrentQty] = useState(MIN_QTY);
    
      const decreaseActive = currentQty > MIN_QTY;
      const increaseActive = currentQty < MAX_QTY;
    
      const decrease = () => {
        setCurrentQty((qty) => Math.max(qty - 1, MIN_QTY));
      };
    
      const increase = () => {
        setCurrentQty((qty) => Math.min(qty + 1, MAX_QTY));
      };

  return (
    <div className={styles.contentCtn}>
      <div className={styles.cartItemCtn}>
        <div className={styles.itemDetailsCtn}>
          <div className={styles.imageCtn}>
            <img
              className={styles.productImage}
              src="/transparent.png"
              alt="Product"
            />
          </div>

          <div className={styles.textCtn}>
            <span className={styles.productTitle}>
              Dr. Vandy’s OrthoHemp™ Pain Relief Oil
            </span>
            <span className={styles.productVariantText}>| Pack of 3</span>
          </div>
        </div>

        <div className={styles.priceQuantityCtn}>
          <div className={styles.priceCtn}>
            <span className={styles.discountedPrice}>₹399.99</span>
            <span className={styles.originalPrice}>₹899.99</span>
          </div>

          <div className={styles.quantityCtn}>
            <button
              className={clsx(
                styles.iconBtn,
                styles.iconBtnMinus,
                decreaseActive == true ? styles.isActive : ""
              )}
              onClick={decrease}
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
            <span className={styles.quantityText}>{currentQty}</span>
            <button
              className={clsx(
                styles.iconBtn,
                styles.iconBtnPlus,
                increaseActive == true ? styles.isActive : ""
              )}
              onClick={increase}
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
      </div>

      <form className={clsx(styles.formSection, styles.pincodeForm)}>
        <label htmlFor="pincode" className={styles.formLabel}>
          Delivery Pincode *
        </label>

        <div className={styles.formRow}>
          <input
            id="pincode"
            name="pincode"
            type="text"
            inputMode="numeric"
            placeholder="Enter Pincode"
            className={styles.input}
            required
          />

          <div className={styles.submitBtnCtn}>
            <button type="submit" className={styles.submitBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.icon}
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </button>
          </div>
        </div>
      </form>

      <form className={clsx(styles.formSection, styles.promotionForm)}>
        <label htmlFor="promo" className={styles.formLabel}>
          Have a promotion code?
        </label>

        <div className={styles.formRow}>
          <input
            id="promo"
            name="promo"
            type="text"
            placeholder="Enter Code"
            className={styles.input}
          />

          <button type="submit" className={styles.submitBtn}>
            <span className={styles.label}>Apply</span>
          </button>
        </div>
      </form>

      <div className={styles.billingCtn}>
        <div className={styles.orderSummaryCtn}>
          <span className={styles.orderSummaryTitle}>Order Summary</span>

          <div className={styles.pricingBreakdownCtn}>
            <div className={clsx(styles.pricingRow, styles.netPricingCtn)}>
              <span className={styles.chargeLabel}>2 Items</span>
              <span className={styles.priceValue}>₹399.99</span>
            </div>

            <div className={clsx(styles.pricingRow, styles.taxCtn)}>
              <span className={styles.chargeLabel}>Tax</span>
              <span className={styles.priceValue}>₹72.00</span>
            </div>

            <div className={clsx(styles.pricingRow, styles.discountCtn)}>
              <span className={styles.chargeLabel}>Discount</span>
              <span className={clsx(styles.priceValue, styles.discountValue)}>
                - ₹100.00
              </span>
            </div>

            <div className={clsx(styles.pricingRow, styles.shippingFeeCtn)}>
              <div className={styles.labelInfoCtn}>
                <span className={styles.chargeLabel}>Shipping Fee</span>
                <div className={styles.infoBtn}>
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
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
              </div>
              <span className={styles.priceValue}>₹190.00</span>
            </div>
          </div>
        </div>

        <div className={styles.totalCtn}>
          <span className={styles.totalLabel}>Total:</span>
          <span className={styles.totalAmount}>₹661.00</span>
        </div>
      </div>
    </div>
  );
}

export default page

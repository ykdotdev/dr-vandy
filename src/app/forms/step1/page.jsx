import styles from "./page.module.css";

const page = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.pageLabelContainer}>
          <img
            className={styles.iconContainer}
            src="icon-container0.svg"
            alt=""
          />
          <span className={styles.pageTitle}>Your Cart</span>
        </div>
        <img className={styles.closeButton} src="close-button0.svg" alt="" />
      </div>

      <div className={styles.contentCTAContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.cartItemContainer}>
            <div className={styles.itemDetailsContainer}>
              <div className={styles.imageContainer}>
                <img
                  className={styles.productImage}
                  src="img-1931-10.png"
                  alt=""
                />
              </div>

              <div className={styles.textContainer}>
                <span className={styles.productTitle}>
                  Dr. Vandy’s OrthoHemp™ Pain Relief Oil
                </span>
                <span className={styles.productVariant}>| Pack of 3</span>
              </div>
            </div>

            <div className={styles.priceQuantityContainer}>
              <div className={styles.priceContainer}>
                <span className={styles.discountedPrice}>₹399.99</span>
                <span className={styles.originalPrice}>₹899.99</span>
              </div>

              <div className={styles.quantityContainer}>
                <img className={styles.vector} src="vector0.svg" alt="" />
                <span className={styles.quantityValue}>2</span>
                <img className={styles.vector2} src="vector1.svg" alt="" />
              </div>
            </div>
          </div>

          <div className={styles.pincodeContainer}>
            <span className={styles.sectionLabel}>Delivery Pincode *</span>

            <div className={styles.pincodeForm}>
              <div className={styles.input}>
                <span className={styles.placeholderText}>Enter Pincode</span>
              </div>
              <div className={styles.submitButton}>
                <img
                  className={styles.iconIconContainer}
                  src="icon-icon-container0.svg"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className={styles.promotionContainer}>
            <span className={styles.sectionLabel}>Have a promotion code?</span>

            <div className={styles.promotionForm}>
              <div className={styles.input2}>
                <span className={styles.placeholderText}>Enter Code</span>
              </div>
              <div className={styles.submitButton2}>
                <span className={styles.apply}>Apply</span>
              </div>
            </div>
          </div>

          <div className={styles.billingContainer}>
            <div className={styles.orderSummaryContainer}>
              <span className={styles.orderSummaryTitle}>Order Summary</span>

              <div className={styles.pricingBreakdownContainer}>
                <div className={styles.netPricingContainer}>
                  <span className={styles.itemCount}>2 Items</span>
                  <span className={styles.priceValue}>₹399.99</span>
                </div>

                <div className={styles.taxContainer}>
                  <span className={styles.chargeLabel}>Tax</span>
                  <span className={styles.priceValue}>₹72.00</span>
                </div>

                <div className={styles.discountContainer}>
                  <span className={styles.chargeLabel}>Discount</span>
                  <span className={styles.discountValue}>- ₹100.00</span>
                </div>

                <div className={styles.shippingFeeContainer}>
                  <div className={styles.labelInfoContainer}>
                    <span className={styles.chargeLabel}>Shipping Fee</span>
                    <img
                      className={styles.infoButton}
                      src="info-button0.svg"
                      alt=""
                    />
                  </div>
                  <span className={styles.priceValue}>₹190.00</span>
                </div>
              </div>
            </div>

            <div className={styles.totalContainer}>
              <span className={styles.totalLabel}>Total:</span>
              <span className={styles.totalAmount}>₹661.00</span>
            </div>
          </div>
        </div>

        <div className={styles.stepCta}>
          <span className={styles.confirmCheckout}>Confirm Checkout</span>
          <img className={styles.vector3} src="vector2.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default page

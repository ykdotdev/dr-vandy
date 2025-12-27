// "use client";
import { supabase } from "@/lib/supabaseClient";
import styles from "./page.module.css";

const page = async () => {

  return (
    <div className={styles.mainCtn}>
      <div className={styles.topCtn}>
        <div className={styles.backCtn}>
          {/* <img className={styles.vector} src="vector0.svg" alt="" /> */}
          <span className={styles.back}>Back</span>
        </div>

        <div className={styles.tabSliderCtn}>
          <div className={styles.productSliderButton}>
            <span className={styles.productText}>Product</span>
          </div>
          <div className={styles.infoSliderButton}>
            <span className={styles.infoText}>Info</span>
          </div>
        </div>
      </div>

      <div className={styles.middleCtn}>
        <div className={styles.leftCtn}>
          <div className={styles.productDetailsCtn}>
            <div className={styles.productDetailsTextTopCtn}>
              <span className={styles.productNameText}>
                Dr. Vandy’s OrthoHemp™ Pain Relief Oil
                <span className={styles.productPack}>{"(Pack of 3)"}</span>
              </span>

              <div className={styles.productSubtitle}>
                Fast Relief • Reduces Inflammation • Improves Mobility
              </div>
            </div>

            <div className={styles.productSize}>50ml</div>
          </div>

          <div className={styles.pricingQuantityCtn}>
            <span className={styles.priceText}>₹399.99</span>

            <div className={styles.quantityCtn}>
              {/* <img className={styles.iconMinus} src="vector1.svg" alt="" />
              <div className={styles.quantity}>1</div>
              <img className={styles.iconPlus} src="vector2.svg" alt="" /> */}
            </div>
          </div>

          <div className={styles.buyNowCta}>
            {/* <div className={styles.buyNow}>Buy Now</div>
            <img className={styles.arrowIcon} src="vector3.svg" alt="" /> */}
          </div>
        </div>

        <div className={styles.centerCtn}>
          <div className={styles.productImageCtn}>
            {/* <img
              className={styles.productImage}
              src="product-image0.png"
              alt="Product"
            /> */}
          </div>

          <div className={styles.imageSliderCtn}>
            <div className={styles.imageSlider}>
              <div className={styles.sliderGroup}>
                <div className={styles.dotActive}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>

              <div className={styles.sliderTrack}></div>

              <div className={styles.sliderGroup}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dotActive}></div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightCtn}>
          <div className={styles.variantSelectorCtn}>
            <div className={styles.packOf}>Pack Of:</div>

            <div className={styles.variantRadioCtn}>
              <div className={styles.variantRadio}>
                <div className={styles.variantValue}>1</div>
              </div>
              <div className={styles.variantRadioActive}>
                <div className={styles.variantValue}>3</div>
              </div>
              <div className={styles.variantRadio}>
                <div className={styles.variantValue}>4</div>
              </div>
            </div>
          </div>

          <div className={styles.accordionsCtn}>
            <div className={styles.accordion}>
              <div className={styles.accordionTitle}>How to Use</div>
              {/* <img className={styles.chevron} src="vector4.svg" alt="" /> */}
            </div>

            <div className={styles.accordion}>
              <div className={styles.accordionTitle}>Key Ingredients</div>
              {/* <img className={styles.chevron} src="vector5.svg" alt="" /> */}
            </div>

            <div className={styles.accordion}>
              <div className={styles.accordionTitle}>Who Is It For</div>
              {/* <img className={styles.chevron} src="vector6.svg" alt="" /> */}
            </div>

            <div className={styles.accordionContent}>
              Ideal for joint pain, arthritis, muscle stiffness, nerve
              discomfort, sports recovery, and daily mobility support. Safe for
              long-term use and all age groups.
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.badges}>
          Doctor-Formulated • GMP Certified • THC-Free
        </div>
      </div>
    </div>
  );
};

export default page

"use client"

import { Suspense, useEffect, useRef, useState } from "react";
import CheckoutBtn from "@/components/CheckoutBtn";
import styles from "./ProductPageClient.module.css";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { sizeMobile, sizeTablet } from "@/config/constants";
import Image from "next/image";
import React from "react";
import { GET_VARIANTS_BY_SLUG } from "@/lib/queries";
import { shopifyFetch } from "@/lib/shopify";
import AddToCartBtn from "@/components/AddToCartBtn";
import  WiserStarRating  from "@/components/WiserStarRating"
import Script from "next/script";
import Loading from "@/app/loading";

const ProductPageClient = ({onReady}) => {

  const [mounted, setMounted] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const slug = "orthohemp-oil";
  const [selectedVariant, setSelectedVariant] = useState(null);
  const isTablet = useMediaQuery({ query: `(max-width: ${sizeTablet})` });
  const isMobile = useMediaQuery({ query: `(max-width: ${sizeMobile})` });
  const isPhotoFrame = useMediaQuery({ query: "(max-width: 1000px)" });
      // const iframeRef = useRef(null);

      // useEffect(() => {
      //   const iframe = iframeRef.current;
      //   if (!iframe) return;

      //   iframe.onload = () => {
      //     const doc = iframe.contentDocument || iframe.contentWindow.document;
      //     doc.open();
      //     doc.write(`
      //   <!DOCTYPE html>
      //   <html>
      //     <head>
      //       <style>body { margin: 0; padding: 0; }</style>
      //     </head>
      //     <body>
      //      <div data-pid='orthohemp-oil' data-id='69d91e00acdb29406906ae09' data-type='star_rating' class='wiser_review wsr_star_rating' data-platform='ecomm_star_rating'></div>
      //       <script>
      //         var s = document.createElement('script');
      //         s.src = 'https://embed.wiserreview.com/pixel/reviewPixel.js?wsid=1l5olkmnt331bk&t=1775836718801';
      //         document.body.appendChild(s);
      //       </script>
      //     </body>
      //   </html>
      // `);
      //     doc.close();
      //   };

      //   iframe.src = "about:blank";
      // }, []);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  

  const [variants, setVariants] = useState([]);
  useEffect(() => {
    const fetchVariants = async () => {
      const data = await shopifyFetch(GET_VARIANTS_BY_SLUG, {
        handle: slug,
      });
      const productImages = data?.product?.images.edges.map(
  (img) => ({ url: img.node.url })
);

      const mappedVariants = data.product.variants.edges.map(({ node: v }) => {
        return {
          id: v.id,
          product_name: data.product.title,
          variant_name: v.title,
          images: productImages,

          price: Number(v.price?.value),

          mrp: Number(v.mrp.amount),

          available_for_sale: v.availableForSale,

          shipping_status: v.shipping_status?.value || "Standard",

          qty_in_pack: v.qty_in_pack?.value || "1",
        };
      });

      setVariants(mappedVariants);
      setSelectedVariant(mappedVariants[0]);
      onReady?.();
    };

    fetchVariants();
  }, []);
        

   const MIN_QTY = 1;

  const [currentQty, setCurrentQty] = useState(MIN_QTY);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

   const MAX_QTY = 9;
  const decreaseActive = currentQty > MIN_QTY;
  const increaseActive = currentQty < MAX_QTY;

  const decrease = () => {
    setCurrentQty((prevQty) => Math.max(prevQty - 1, MIN_QTY));
  };

  const increase = () => {
    setCurrentQty((prevQty) => Math.min(prevQty + 1, MAX_QTY));
  };
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [imageArr, setImageArr] = useState([]);
  const photoIndexCount = imageArr?.length;


  useEffect(() => {
    const maxQty = 9;

    setCurrentQty((prevQty) => Math.max(MIN_QTY, Math.min(prevQty, maxQty)));
    if (!selectedVariant) return;
    setImageArr(selectedVariant?.images);

  }, [selectedVariant]);

  return variants.length > 0 && selectedVariant && (
    <>
      {mounted && isPhotoFrame && (
        <div className={styles.tabletTopCtn}>
          <div className={styles.centerCtn}>
            <div className={styles.productImageCtn}>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                  prevEl: `.${styles.prev}`,
                  nextEl: `.${styles.next}`,
                }}
                pagination={{
                  el: `.${styles.pagination}`,
                  clickable: true,
                }}
                slidesPerView={1}
                roundLengths={true}
              >
                {imageArr?.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <Image
                      className={styles.productImage}
                      src={img.url}
                      width={800}
                      height={600}
                      alt="Product Image"
                      priority={idx === 0}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={styles.imageSliderCtn}>
              <button className={styles.prev}>
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
                  <path d="m14 16-4-4 4-4" />
                </svg>
              </button>
              <div className={styles.pagination} />

              <button className={styles.next}>
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
                  <path d="m10 8 4 4-4 4" />
                </svg>
              </button>
            </div>
            {/* <div className={styles.imageSliderCtn}>
                <div className={clsx(styles.dot)}></div>
                <div className={clsx(styles.dot)}></div>
                <div className={clsx(styles.dot)}></div>
                <div className={clsx(styles.dot, styles.active)}></div>
                <div className={styles.dot}></div>
              </div> */}
          </div>
          <div className={styles.rightCtn}>
            <div className={styles.variantSelectorCtn}>
              <span className={styles.Text}>Pack Of:</span>

              <div className={styles.variantRadioCtn}>
                {variants.map((variant, i) => (
                  <label key={i}>
                    <input
                      type="radio"
                      id={`variant-${variant.variant_name}`}
                      name="variant-choice"
                      value={variant.variant_name}
                      checked={selectedVariant.id === variant.id}
                      style={{ display: "none" }} // hide the native radio
                      onChange={() => setSelectedVariant(variant)}
                    />
                    <span
                      className={clsx(
                        styles.variantRadio,
                        selectedVariant.id === variant.id &&
                          styles.variantRadioActive,
                      )}
                    >
                      {variant.qty_in_pack}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {!isMobile && (
              <div className={styles.accordionsCtn}>
                <div
                  className={clsx(
                    styles.accordion,
                    openIndex === 0 ? styles.active : "",
                  )}
                >
                  <button
                    className={styles.headerCtn}
                    onClick={() => {
                      toggleAccordion(0);
                    }}
                  >
                    <span className={styles.titleText}>How to Use</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={clsx(styles.icon, styles.iconExpand)}
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={clsx(styles.icon, styles.iconContract)}
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <div className={styles.contentCtn}>
                    <p className={styles.contentText}>
                      - Take 3 ml oil
                      <br />
                      - Gently massage for 3–5 minutes on affected area
                      <br />
                      - Use 2–3 times daily
                      <br />
                      <br />
                      “For chronic conditions, use consistently for 7–14 days to
                      observe cumulative benefits.”
                      <br />
                      For best results, use a warm compress post-use for
                      enhanced penetration
                    </p>
                  </div>
                </div>
                <div
                  className={clsx(
                    styles.accordion,
                    openIndex === 1 ? styles.active : "",
                  )}
                >
                  <button
                    className={styles.headerCtn}
                    onClick={() => {
                      toggleAccordion(1);
                    }}
                  >
                    <span className={styles.titleText}>Key Ingredients</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={clsx(styles.icon, styles.iconExpand)}
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={clsx(styles.icon, styles.iconContract)}
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <div className={styles.contentCtn}>
                    <p className={styles.contentText}>
                      Formulated with Hemp Seed Oil, Vijaya Leaf Extract,
                      Boswellia, Turmeric CO₂, Menthol, Camphor, and a blend of
                      therapeutic botanicals that work together to support
                      joint, muscle, and nerve comfort.
                    </p>
                  </div>
                </div>
                <div
                  className={clsx(
                    styles.accordion,
                    openIndex === 2 ? styles.active : "",
                  )}
                >
                  <button
                    className={styles.headerCtn}
                    onClick={() => {
                      toggleAccordion(2);
                    }}
                  >
                    <span className={styles.titleText}>Who Is It For</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={clsx(styles.icon, styles.iconExpand)}
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={clsx(styles.icon, styles.iconContract)}
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <div className={styles.contentCtn}>
                    <p className={styles.contentText}>
                      Anybody having the indications as mentioned below:
                      <br />
                      <span className={styles.specialStyling}>
                        Arthritis Conditions:
                      </span>{" "}
                      Rheumatoid Arthritis, Osteoarthritis, Spondylitis Nerve &{" "}
                      <br />
                      <span className={styles.specialStyling}>
                        Muscle Conditions:
                      </span>
                      Sciatica, Neuropathy, Muscle Cramps, Frozen Shoulder
                      <br />
                      <span className={styles.specialStyling}>
                        Others:
                      </span>{" "}
                      Sports Injuries, Tendonitis, Postural Pain
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className={styles.middleCtn}>
        <div className={styles.leftCtn}>
          <div className={styles.productDetailsCtn}>
            <div className={styles.textCtn}>
              <WiserStarRating/>

              <span className={styles.productHeadingText}>
                Dr. Vandy’s OrthoHemp™ Pain Relief Oil{" "}
                <span className={styles.productVariantText}>
                  {selectedVariant.variant_name}
                </span>
              </span>

              <span className={styles.productSubtitleText}>
                Fast Relief • Reduces Inflammation • Improves Mobility
              </span>
            </div>

            <div className={styles.productSizeText}>50ml</div>
          </div>

          <div className={styles.pricingQuantityCtn}>
            <div className={styles.pricingCtn}>
              <span className={styles.priceText}>₹{selectedVariant.price}</span>
              {selectedVariant.available_for_sale === true && (
                <div className={styles.MRPDiscountCtn}>
                  <span className={styles.MRPText}>₹{selectedVariant.mrp}</span>
                  <div className={styles.discountCtn}>
                    <span className={styles.indicator}></span>
                    <span className={styles.text}>
                      {Number(
                        (
                          ((selectedVariant.mrp - selectedVariant.price) /
                            selectedVariant.mrp) *
                          100
                        ).toFixed(1),
                      )}
                      % off
                    </span>
                  </div>
                </div>
              )}
            </div>

            {selectedVariant.available_for_sale === true ? (
              <div className={styles.quantityCtn}>
                <button
                  className={clsx(
                    styles.iconBtn,
                    styles.iconBtnMinus,
                    decreaseActive ? styles.isActive : "",
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
                    increaseActive ? styles.isActive : "",
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

          {selectedVariant.available_for_sale === true && (
            <div className={styles.ctaRow}>
              <CheckoutBtn
                variant_id={selectedVariant.id}
                quantity={currentQty}
              />
              <AddToCartBtn
                variant_id={selectedVariant.id}
                quantity={currentQty}
              />
            </div>
          )}
        </div>

        {mounted && !isPhotoFrame && (
          <>
            <div className={styles.centerCtn}>
              <div className={styles.productImageCtn}>
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation={{
                    prevEl: `.${styles.prev}`,
                    nextEl: `.${styles.next}`,
                  }}
                  pagination={{
                    el: `.${styles.pagination}`,
                    clickable: true,
                  }}
                  onSlideChange={(swiper) => {
                    // optional: keep index in sync if you need it elsewhere
                    // setCurrentPhotoIndex(swiper.activeIndex);
                  }}
                >
                  {imageArr?.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <Image
                        className={styles.productImage}
                        src={img.url}
                        width={800}
                        height={600}
                        alt="Product"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className={styles.imageSliderCtn}>
                <button className={styles.prev}>
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
                    <path d="m14 16-4-4 4-4" />
                  </svg>
                </button>
                <div className={styles.pagination} />

                <button className={styles.next}>
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
                    <path d="m10 8 4 4-4 4" />
                  </svg>
                </button>
              </div>
              {/* <div className={styles.imageSliderCtn}>
                <div className={clsx(styles.dot)}></div>
                <div className={clsx(styles.dot)}></div>
                <div className={clsx(styles.dot)}></div>
                <div className={clsx(styles.dot, styles.active)}></div>
                <div className={styles.dot}></div>
              </div> */}
            </div>
            <div className={styles.rightCtn}>
              <div className={styles.variantSelectorCtn}>
                <span className={styles.Text}>Pack Of:</span>

                <div className={styles.variantRadioCtn}>
                  {variants.map((variant, i) => (
                    <label key={i}>
                      <input
                        type="radio"
                        id={`variant-${variant.variant_name}`}
                        name="variant-choice"
                        value={variant.variant_name}
                        checked={selectedVariant.id === variant.id}
                        style={{ display: "none" }} // hide the native radio
                        onChange={() => setSelectedVariant(variant)}
                      />
                      <span
                        className={clsx(
                          styles.variantRadio,
                          selectedVariant.id === variant.id &&
                            styles.variantRadioActive,
                        )}
                      >
                        {variant.qty_in_pack}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.accordionsCtn}>
                <div
                  className={clsx(
                    styles.accordion,
                    openIndex === 0 ? styles.active : "",
                  )}
                >
                  <button
                    className={styles.headerCtn}
                    onClick={() => {
                      toggleAccordion(0);
                    }}
                  >
                    <span className={styles.titleText}>How to Use</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={clsx(styles.icon, styles.iconExpand)}
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={clsx(styles.icon, styles.iconContract)}
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <div className={styles.contentCtn}>
                    <p className={styles.contentText}>
                      - Take 3 ml oil
                      <br />
                      - Gently massage for 3–5 minutes on affected area
                      <br />
                      - Use 2–3 times daily
                      <br />
                      <br />
                      “For chronic conditions, use consistently for 7–14 days to
                      observe cumulative benefits.”
                      <br />
                      For best results, use a warm compress post-use for
                      enhanced penetration
                    </p>
                  </div>
                </div>
                <div
                  className={clsx(
                    styles.accordion,
                    openIndex === 1 ? styles.active : "",
                  )}
                >
                  <button
                    className={styles.headerCtn}
                    onClick={() => {
                      toggleAccordion(1);
                    }}
                  >
                    <span className={styles.titleText}>Key Ingredients</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={clsx(styles.icon, styles.iconExpand)}
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={clsx(styles.icon, styles.iconContract)}
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <div className={styles.contentCtn}>
                    <p className={styles.contentText}>
                      Formulated with Hemp Seed Oil, Vijaya Leaf Extract,
                      Boswellia, Turmeric CO₂, Menthol, Camphor, and a blend of
                      therapeutic botanicals that work together to support
                      joint, muscle, and nerve comfort.
                    </p>
                  </div>
                </div>
                <div
                  className={clsx(
                    styles.accordion,
                    openIndex === 2 ? styles.active : "",
                  )}
                >
                  <button
                    className={styles.headerCtn}
                    onClick={() => {
                      toggleAccordion(2);
                    }}
                  >
                    <span className={styles.titleText}>Who Is It For</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={clsx(styles.icon, styles.iconExpand)}
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={clsx(styles.icon, styles.iconContract)}
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <div className={styles.contentCtn}>
                    <p className={styles.contentText}>
                      Anybody having the indications as mentioned below:
                      <br />
                      <span className={styles.specialStyling}>
                        Arthritis Conditions:
                      </span>{" "}
                      Rheumatoid Arthritis, Osteoarthritis, Spondylitis Nerve &{" "}
                      <br />
                      <span className={styles.specialStyling}>
                        Muscle Conditions:
                      </span>
                      Sciatica, Neuropathy, Muscle Cramps, Frozen Shoulder
                      <br />
                      <span className={styles.specialStyling}>
                        Others:
                      </span>{" "}
                      Sports Injuries, Tendonitis, Postural Pain
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
};

export default ProductPageClient;

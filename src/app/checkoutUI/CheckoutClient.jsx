"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import StepCTA from "@/app/components/StepCTA";
import clsx from "clsx";
import BackBtn from "../components/BackBtn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingSchema } from "@/schemas/shipping.schema";
import { promoSchema } from "@/schemas/promo.schema";
import { useRouter } from "next/navigation";
import { useToast } from "../components/ToastProvider";

const CheckoutClient = ({product, variant, qty, amount}) => {
      const router = useRouter();
        const { showToast } = useToast();
      
    console.log("variant", variant)
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(shippingSchema),
    mode: "onBlur",
  });

  const {
    register: registerPromo,
    handleSubmit: handlePromoSubmit,
    formState: { errors: promoErrors, isSubmitting: promoSubmitting },
    setError: setPromoError,
    clearErrors: clearPromoErrors,
  } = useForm({
    resolver: zodResolver(promoSchema),
  });

  const onApplyPromo = async ({ promo }) => {
    console.log("FUNCTION WORKING");
    const res = await fetch("/api/promoCode", {
      method: "POST",
      body: JSON.stringify({ promoCode: promo }),
    });

    const data = await res.json();

    if (!data.valid) {
      setPromoError("promo", {
        message: "Invalid promo code",
      });
      console.log(data);
    } else {
      console.log("APPLIED SUCCESSFULLY");
      console.log(data.discount);
      setAppliedPromoCode(data)
    }
  };

  const MIN_QTY = 1;
  const MAX_QTY = Math.min(variant.current_stock, 9);
  console.log(MIN_QTY)
  const [currentQty, setCurrentQty] = useState(Number(qty));

  const decreaseActive = currentQty > MIN_QTY;
  const increaseActive = currentQty < MAX_QTY;

  const decrease = () => {
    setCurrentQty((prevQty) => Math.max(prevQty - 1, MIN_QTY));
  };

  const increase = () => {
    setCurrentQty((prevQty) => Math.min(prevQty + 1, MAX_QTY));
  };
  console.log(errors);

  const [totals, setTotals] = useState({
    subtotal: 0, //price*qty
    tax: 0,
    discount: 0,
    shipping: 0,
    totalPaise: 0,
    totalRupees: 0,
  });
  console.log("PAISE", totals.totalPaise)
  const [appliedPromoCode, setAppliedPromoCode] = useState(null);

  useEffect(() => {
      const calculateTotals = () => {
        const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

        const subtotal = round2(variant.price * currentQty);

        const discount = appliedPromoCode
          ? round2(subtotal * (appliedPromoCode.discount / 100))
          : 0;

        const taxable = round2(subtotal - discount);

        const tax = round2(taxable * 0.18); // 18% GST
        const shipping = 0;

        const totalRupees = round2(taxable + tax + shipping);
        const totalPaise = Math.round(totalRupees * 100);

        setTotals({
          subtotal,
          discount,
          tax,
          shipping,
          totalPaise,
          totalRupees,
        });
      };

    calculateTotals();
  }, [currentQty, appliedPromoCode]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };


const handlePayment = async () => {
  try {
    // 1️⃣ Get validated shipping details from form
    const formData = getValues();
    console.log("Shipping data:", formData);

    // 2️⃣ Load Razorpay SDK
    const loaded = await loadRazorpay();
    if (!loaded || typeof window.Razorpay === "undefined") {
      alert("Razorpay SDK failed to load.");
      return;
    }
    console.log("appliedPromoCode: ", appliedPromoCode?.code)
    // 3️⃣ Create order via API (Supabase RPC + Razorpay order)
    const res = await fetch("/api/createOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [
          {
            variant_id: String(variant.id), // UUID as string
            quantity: currentQty,
          },
        ],
        shipping_info: {
          user_name: formData.fullName,
          user_email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        promo_code: appliedPromoCode?.code
      }),
    });

    const { order, razorpayOrder, error } = await res.json();
    if (error) {
      console.log("Order creation failed:", error);
      showToast(error, "error");
      return;
    }

    console.log("Supabase order:", order);
    console.log("Razorpay order:", razorpayOrder);

    // 4️⃣ Open Razorpay modal
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount, // paise
      currency: razorpayOrder.currency,
      name: "Dr. Vandy's",
      order_id: razorpayOrder.id,
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },
      handler: async (paymentResponse) => {
        console.log(paymentResponse)
        try {
          await fetch("/api/confirmPayment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              order_id: order[0].order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_order_id: paymentResponse.razorpay_order_id,
              // razorpay_signature: paymentResponse.razorpay_signature,
              status: "paid",
            }),
          });

          // router.push(`/payment/?oID=${razorpayOrder.id}`);
        } catch (verifyError) {
          console.error("Payment verification failed:", verifyError);
          showToast("Payment verification failed", "error");
        }
      },
      theme: { color: "#000000" },
      modal: {
    ondismiss: async function () {
      console.log("Razorpay modal closed without payment");
      try {
        await fetch("/api/confirmPayment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: order[0].order_id,
            status: "cancelled",
          }),
        });
      } catch (err) {
        console.error("Error cancelling order:", err);
      }
    }
  }
    };
    

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Payment error:", err);
    alert(err.message || "Something went wrong");
  }
};





  const handlePaymentClick = handleSubmit(handlePayment);


  return (
    <div className={styles.layoutFrame}>
      <div className={styles.shippingCtn}>
        <div className={styles.headerCtn}>
          <BackBtn />
          <div className={styles.stepLabelCtn}>
            <div className={styles.iconCtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.stepIcon}
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <span className={styles.stepTitle}>Shipping</span>
          </div>
          {/* <button className={styles.closeBtn}>
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button> */}
        </div>
        <form className={styles.contentForm}>
          {/* Full Name */}
          <div className={clsx(styles.gridRowSingle, styles.row1)}>
            <label htmlFor="fullName" className={styles.label}>
              Full name *
            </label>
            <input
              type="text"
              {...register("fullName")}
              placeholder="Enter your full name"
              className={styles.input}
            />
          </div>

          {/* Email & Phone */}
          <div className={clsx(styles.gridRowDual, styles.row2)}>
            <div className={clsx(styles.subColumn, styles.email)}>
              <label htmlFor="email" className={styles.label}>
                Email address *
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email address"
                className={clsx(
                  styles.input,
                  errors.email && styles.inputError
                )}
              />
              {errors.email && (
                <span className={styles.errorMessage}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className={clsx(styles.subColumn, styles.phoneNumber)}>
              <label htmlFor="phone" className={styles.label}>
                Phone number *
              </label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="Enter your phone number"
                className={clsx(
                  styles.input,
                  errors.phone && styles.inputError
                )}
              />
              {errors.phone && (
                <span className={styles.errorMessage}>
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          {/* Address */}
          <div className={clsx(styles.gridRowSingle, styles.row3)}>
            <label htmlFor="address" className={styles.label}>
              Address (House no, Street, Area) *
            </label>
            <input
              {...register("address")}
              type="text"
              placeholder="Enter your address"
              className={styles.input}
            />
          </div>

          {/* City & State */}
          <div className={clsx(styles.gridRowTriple, styles.row4)}>
            <div className={clsx(styles.subColumn, styles.city)}>
              <label htmlFor="city" className={styles.label}>
                City *
              </label>
              <input
                {...register("city")}
                type="text"
                placeholder="Enter your city"
                className={styles.input}
              />
            </div>

            <div className={clsx(styles.subColumn, styles.stateDropdown)}>
              <label htmlFor="state" className={styles.label}>
                State *
              </label>
              <div className={styles.selectWrapper}>
                <select
                  {...register("state")}
                  defaultValue=""
                  required
                  className={styles.input}
                >
                  <option value="" disabled hidden>
                    Select State
                  </option>

                  {/* States */}
                  <option value="AP">Andhra Pradesh</option>
                  <option value="AR">Arunachal Pradesh</option>
                  <option value="AS">Assam</option>
                  <option value="BR">Bihar</option>
                  <option value="CT">Chhattisgarh</option>
                  <option value="GA">Goa</option>
                  <option value="GJ">Gujarat</option>
                  <option value="HR">Haryana</option>
                  <option value="HP">Himachal Pradesh</option>
                  <option value="JH">Jharkhand</option>
                  <option value="KA">Karnataka</option>
                  <option value="KL">Kerala</option>
                  <option value="MP">Madhya Pradesh</option>
                  <option value="MH">Maharashtra</option>
                  <option value="MN">Manipur</option>
                  <option value="ML">Meghalaya</option>
                  <option value="MZ">Mizoram</option>
                  <option value="NL">Nagaland</option>
                  <option value="OR">Odisha</option>
                  <option value="PB">Punjab</option>
                  <option value="RJ">Rajasthan</option>
                  <option value="SK">Sikkim</option>
                  <option value="TN">Tamil Nadu</option>
                  <option value="TG">Telangana</option>
                  <option value="TR">Tripura</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="UK">Uttarakhand</option>
                  <option value="WB">West Bengal</option>

                  {/* Union Territories */}
                  <option value="AN">Andaman and Nicobar Islands</option>
                  <option value="CH">Chandigarh</option>
                  <option value="DN">
                    Dadra and Nagar Haveli and Daman and Diu
                  </option>
                  <option value="DL">Delhi</option>
                  <option value="JK">Jammu and Kashmir</option>
                  <option value="LA">Ladakh</option>
                  <option value="LD">Lakshadweep</option>
                  <option value="PY">Puducherry</option>
                </select>
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>

            <div className={clsx(styles.subColumn, styles.pincode)}>
              <label htmlFor="pincode" className={styles.label}>
                Pincode *
              </label>
              <input
                {...register("pincode")}
                type="number"
                placeholder="Enter your pincode"
                className={styles.input}
              />
            </div>
          </div>

          {/* Pincode */}
          <div className={clsx(styles.shippingRow, styles.row5)}>
            <div className={styles.shippingTitle}>Shipping Method</div>
            <label className={styles.radioCtn}>
              <div className={styles.leftCtn}>
                {/* REAL RADIO (hidden) */}
                <input
                  type="radio"
                  name="shipping"
                  value="free"
                  checked
                  disabled
                  required
                  className={styles.inputRadio}
                />
                <input
                  type="hidden"
                  name="shipping"
                  value="free"
                  {...register("shippingMethod")}
                />

                {/* CUSTOM RADIO */}
                <span className={styles.customRadio} />
                <div className={styles.textCtn}>
                  <span className={styles.optionLabel}>Free Shipping</span>
                  <span className={styles.shippingTime}>| 7-20 Days</span>
                </div>
              </div>
              <span className={styles.shippingPrice}>₹0</span>
            </label>
          </div>
        </form>
      </div>
      <div className={styles.cartCtn}>
        <span className={styles.cartTitle}>Your Cart</span>
        <div className={styles.contentCTACtn}>
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
                  <span className={styles.productTitle}>{product.name}</span>
                  <span className={styles.productVariantText}>
                    | {variant.variant_name}
                  </span>
                </div>
              </div>

              <div className={styles.priceQuantityCtn}>
                <div className={styles.priceCtn}>
                  <span className={styles.discountedPrice}>
                    ₹{variant.price}
                  </span>
                  {variant.current_stock > 0 ? (
                  <span className={styles.originalPrice}>₹{variant.mrp}</span>

                  ) : ""}
                </div>

                {variant.current_stock > 0 ? (
                  <div className={styles.quantityCtn}>
                    <button
                      className={clsx(
                        styles.iconBtn,
                        styles.iconBtnMinus,
                        decreaseActive ? styles.isActive : ""
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
                        increaseActive ? styles.isActive : ""
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
            </div>

            <div className={styles.promotionForm}>
              <label htmlFor="promo" className={styles.formLabel} hidden>
                Have a promotion code?
              </label>

              <div className={styles.iconLabelCtn}>
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
                  <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                  <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
                </svg>

                <input
                  {...registerPromo("promo")}
                  type="text"
                  placeholder="Discount Code"
                  className={clsx(
                    styles.input,
                    promoErrors.promo && styles.inputError
                  )}
                />
              </div>

              <button
                type="submit"
                onClick={handlePromoSubmit(onApplyPromo)}
                className={styles.submitBtn}
              >
                <span className={styles.label}>Apply</span>
              </button>
              {promoErrors.promo && (
                <span className={styles.errorMessage}>
                  {promoErrors.promo.message}
                </span>
              )}
            </div>

            <div className={styles.billingCtn}>
              <div className={styles.pricingBreakdownCtn}>
                <div className={clsx(styles.pricingRow, styles.netPricingCtn)}>
                  <span className={styles.chargeLabel}>2 Items</span>
                  <span className={styles.priceValue}>
                    ₹{totals.subtotal.toFixed(2)}
                  </span>
                </div>

                <div className={clsx(styles.pricingRow, styles.taxCtn)}>
                  <span className={styles.chargeLabel}>Tax</span>
                  <span className={styles.priceValue}>
                    ₹{totals.tax.toFixed(2)}
                  </span>
                </div>

                <div className={clsx(styles.pricingRow, styles.discountCtn)}>
                  <span className={styles.chargeLabel}>
                    Discount{" "}
                    {appliedPromoCode && `(${appliedPromoCode.discount}%)`}
                  </span>
                  <span
                    className={clsx(styles.priceValue, styles.discountValue)}
                  >
                    - ₹{totals.discount?.toFixed(2)}
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
                  <span className={styles.priceValue}>
                    ₹{totals.shipping.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className={styles.totalCtn}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalAmount}>
                  ₹{totals.totalRupees.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <StepCTA
            currentStep={1}
            btnStatus="active"
            onClick={handlePaymentClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutClient;

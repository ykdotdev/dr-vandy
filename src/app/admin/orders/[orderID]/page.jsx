"use client";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

const Page = () => {
  const params = useParams(); // <-- correct way in client
  const {orderID}  = params;
  const [orderData, setOrderData] = useState({});
    const formatDate = (timestamp) => {
      return new Date(timestamp).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    };
  useEffect(()=>{
    const getorder = async () => {
      try {
        const res = await fetch("/api/getSingleOrder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID }),
        });

        const data = await res.json();
        setOrderData(data);
        // console.log(data);
      } catch (err) {
        // console.error("Fetch error:", err);
      }
    };
    getorder();
  }, [])

    if (!orderData || !orderData.order) return <div>Awaiting Fetch...</div>;

    return (
      <div className={styles.orderCtn}>
        {/* Order Details */}
        <div className={styles.field}>
          <div className={styles.label}>Order ID:</div>
          <div className={styles.value}>{orderData.order.id}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Amount:</div>
          <div className={styles.value}>{orderData.order.amount}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Razorpay Payment ID:</div>
          <div className={styles.value}>
            {orderData.order.razorpay_payment_id}
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Razorpay Order ID:</div>
          <div className={styles.value}>
            {orderData.order.razorpay_order_id}
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Status:</div>
          <div className={styles.value}>{orderData.order.status}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Created At:</div>
          <div className={styles.value}>
            {formatDate(orderData.order.created_at)}
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Updated At:</div>
          <div className={styles.value}>
            {formatDate(orderData.order.updated_at)}
          </div>
        </div>

        {/* Shipping Info */}
        <div className={styles.field}>
          <div className={styles.label}>Shipping Name:</div>
          <div className={styles.value}>
            {orderData.order.shipping_info.user_name}
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Shipping Email:</div>
          <div className={styles.value}>
            {orderData.order.shipping_info.user_email}
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Phone:</div>
          <div className={styles.value}>
            {orderData.order.shipping_info.phone}
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Address:</div>
          <div className={styles.value}>
            {orderData.order.shipping_info.address}
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>City:</div>
          <div className={styles.value}>
            {orderData.order.shipping_info.city}
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>State:</div>
          <div className={styles.value}>
            {orderData.order.shipping_info.state}
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Pincode:</div>
          <div className={styles.value}>
            {orderData.order.shipping_info.pincode}
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles.label}>Promo Code:</div>
          <div className={styles.value}>{orderData.order.promo_code}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Shiprocket Status:</div>
          <div className={styles.value}>
            {orderData.order.shiprocket_status}
          </div>
        </div>

        {/* Items */}
        {orderData.items &&
          orderData.items.map((item, index) => (
            <div className={styles.itemCtn} key={index}>
              <div className={styles.field}>
                <div className={styles.label}>Item Variant ID:</div>
                <div className={styles.value}>{item.variant_id}</div>
              </div>
              <div className={styles.field}>
                <div className={styles.label}>Quantity:</div>
                <div className={styles.value}>{item.quantity}</div>
              </div>
              <div className={styles.field}>
                <div className={styles.label}>Price at Purchase:</div>
                <div className={styles.value}>{item.price_at_purchase}</div>
              </div>
              <div className={styles.field}>
                <div className={styles.label}>Item Created At:</div>
                <div className={styles.value}>{item.created_at}</div>
              </div>
            </div>
          ))}
      </div>
    );
};

export default Page;

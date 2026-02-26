"use client"
import React, { useEffect, useState } from 'react'
import styles from './OrdersClient.module.css'
import { useRouter } from 'next/navigation'
import StatusIndicator from '@/components/admin/StatusIndicator'

const OrdersClient = () => {
  const router = useRouter()
  const [rows, setRows] = useState([]);
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await fetch("/api/getOrders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

        const data = await res.json();
        setRows(data.orders || []);
        // console.log("orders:",data)
      } catch (err) {
        // console.error("Fetch error:", err);
      }
    };

    getOrders();
  }, []);

  return (
    <div className={styles.mainOrderCtn}>
      <div className={styles.header}>
        <span className={styles.heading}>Orders</span>
        <span className={styles.subheading}>
          An overview of recent data of customers info, products details and
          analysis.
        </span>
      </div>
      <div className={styles.contentCtn}>
        <div className={styles.topCtn}>
          <span className={styles.heading}>All Orders</span>
          <span className={styles.subheading}>
            Keep track of recent order data and others information.
          </span>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Shiprocket Status</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => {
                  router.push(`/admin/orders/${row.id}`);
                }}
              >
                <td className={styles.orderID}>{row.id}</td>
                <td>{row.shipping_info.user_name}</td>
                <td>{formatDate(row.created_at)}</td>
                <td>₹{row.amount}</td>
                <td>{row.shiprocket_status === null && "Pending"}</td>
                <td>
                  <StatusIndicator status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.bottomCtn}>
          <span className={styles.footer}>
            Copyright © 2026 drvandys.com - All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrdersClient;

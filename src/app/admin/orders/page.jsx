"use client"
import Navbar from "@/components/admin/Navbar";
import OrdersClient from "./OrdersClient";
import clsx from "clsx";
import { useState } from "react";
import styles from './page.module.css'
import InventoryClient from "./InventoryClient";

const page = () => {
  const [currentPage, setCurrentPage] = useState("orders");
        const handleActivePage = (requiredPage) => {
          if (currentPage != requiredPage) {
            setCurrentPage(requiredPage);
          }
        };
        console.log(currentPage)
  return (
    <div className={styles.mainContainer}>
      <div className={styles.navbar}>
        <span className={styles.logo}>Dr. Vandy's</span>
        <div className={styles.navMenu}>
          <button
            onClick={() => {
              handleActivePage("inventory");
            }}
            className={clsx(
              styles.navItem,
              styles.navItem01,
              currentPage === "inventory" && styles.active
            )}
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
              <path d="M3 7V5a2 2 0 0 1 2-2h2" />
              <path d="M17 3h2a2 2 0 0 1 2 2v2" />
              <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
              <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
              <path d="M7 12h10" />
            </svg>
            <span className={styles.label}>Inventory</span>
          </button>
          <button
            onClick={() => {
              handleActivePage("orders");
            }}
            className={clsx(
              styles.navItem,
              styles.navItem02,
              currentPage === "orders" && styles.active
            )}
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
              <path d="M8 2v4" />
              <path d="M12 2v4" />
              <path d="M16 2v4" />
              <rect width="16" height="18" x="4" y="4" rx="2" />
              <path d="M8 10h6" />
              <path d="M8 14h8" />
              <path d="M8 18h5" />
            </svg>
            <span className={styles.label}>Orders</span>
          </button>
        </div>
        <button className={styles.logoutBtn}>
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
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          </svg>
        </button>
      </div>
      {currentPage === "orders" && <OrdersClient />}
      {currentPage === "inventory" && <InventoryClient/>}
    </div>
  );
}

export default page

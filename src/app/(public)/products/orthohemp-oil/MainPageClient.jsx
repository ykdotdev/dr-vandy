"use client";
import { useState } from "react";
import styles from "./page.module.css";
import clsx from "clsx";
import ProductPageClient from "./ProductPageClient";
import BackBtn from "@/components/BackBtn";
import { useParams } from "next/navigation";
import InfoPageClient from "./InfoPageClient";
import CartBtn from "@/components/CartBtn";

const MainPageClient = ({pageStatus}) => {
// console.log("status",pageStatus)
  const [currentPage, setCurrentPage] = useState(pageStatus === "1" ? "info" : "product");

  const handleActivePage = (requiredPage)=>{
    if(currentPage!=requiredPage){
        setCurrentPage(requiredPage);
    }
  }

  return (
    <div className={styles.mainCtn}>
      <div className={styles.topCtn}>
        <BackBtn/>

        <div className={styles.tabSliderCtn}>
          <button
            className={clsx(
              styles.SliderBtn,
              currentPage === "product" ? styles.btnActive : ""
            )}
            onClick={() => {
              handleActivePage("product");
            }}
          >
            <span className={styles.label}>Product</span>
          </button>
          <button
            className={clsx(
              styles.SliderBtn,
              currentPage === "info" ? styles.btnActive : ""
            )}
            onClick={() => {
              handleActivePage("info");
            }}
          >
            <span className={styles.label}>Info</span>
          </button>
        </div>

        <CartBtn/>
      </div>

      {currentPage === "product" && (
        <ProductPageClient/>
      ) || currentPage === "info" && (
        <InfoPageClient />
      )}
      {/* <InfoPageClient /> */}
      {/* <div className={styles.bottomSection}>
          <span className={styles.badgesText}>
            Doctor-Formulated • GMP Certified • THC-Free
          </span>
        </div> */}
    </div>
  );
};

export default MainPageClient;

"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import clsx from "clsx";
import ProductPageClient from "./ProductPageClient";
import BackBtn from "@/components/BackBtn";
import { useParams } from "next/navigation";
import InfoPageClient from "./InfoPageClient";
import CartBtn from "@/components/CartBtn";
import Loading from "@/app/loading";

const MainPageClient = ({pageStatus}) => {
// console.log("status",pageStatus)
const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(pageStatus === "1" ? "info" : "product");

  useEffect(()=>{
    if(currentPage === "product"){
      setIsLoading(true);
    }
  }, [])

  const handleActivePage = (requiredPage)=>{
    if(currentPage!=requiredPage){
        setCurrentPage(requiredPage);
    }
  }

  return (
    <div className={styles.mainCtn}>
      <div className={styles.topCtn}>
        <BackBtn />

        <div className={styles.tabSliderCtn}>
          <button
            className={clsx(
              styles.SliderBtn,
              currentPage === "product" ? styles.btnActive : "",
            )}
            onClick={() => {
              setIsLoading(true);
              handleActivePage("product");
            }}
          >
            <span className={styles.label}>Product</span>
          </button>
          <button
            className={clsx(
              styles.SliderBtn,
              currentPage === "info" ? styles.btnActive : "",
            )}
            onClick={() => {
              handleActivePage("info");
            }}
          >
            <span className={styles.label}>Info</span>
          </button>
        </div>

        <CartBtn />
      </div>
      {isLoading && (
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
      )}
      {(currentPage === "product" && (
        <ProductPageClient onReady={() => setIsLoading(false)} />
      )) ||
        (currentPage === "info" && <InfoPageClient />)}
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

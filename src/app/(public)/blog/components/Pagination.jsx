"use client";

import React from "react";
import clsx from "clsx";
import { IconChevronLeft, IconChevronRight } from "./InlineIcons";
import styles from "./Pagination.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className={styles.section}>
      <div className={styles.divider} />
      <div className={styles.controls}>
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.btn}
          aria-label="Previous page"
        >
          <IconChevronLeft size={16} />
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={clsx(styles.btn, page === currentPage && styles.btnActive)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.btn}
          aria-label="Next page"
        >
          <IconChevronRight size={16} />
        </button>
      </div>

      {/* Page indicator */}
      <p className={styles.pageIndicator}>
        Page {currentPage} of {totalPages}
      </p>
    </section>
  );
}
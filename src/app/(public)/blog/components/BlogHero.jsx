"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import { IconSearch, IconX } from "./InlineIcons";
import styles from "./BlogHero.module.css";

export default function BlogHero({
  searchQuery,
  onSearchChange,
  categories,
  /** null = "All" */
  activeCategorySlug,
}) {
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const searchRef = useRef(null);
  const catsRef = useRef(null);

  useEffect(() => {
    const els = [
      headlineRef.current,
      subRef.current,
      searchRef.current,
      catsRef.current,
    ];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.filter = "blur(4px)";
      setTimeout(() => {
        if (!el) return;
        el.style.transition =
          "opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1), filter 0.75s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        el.style.filter = "blur(0)";
      }, 100 + i * 120);
    });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          Health Insights
        </div>

        <h1 ref={headlineRef} className={styles.headline}>
          Real Answers
          <br />
          <em className={clsx(styles.headlineEm, styles.headlineAccent)}>
            for Everyday Pain
          </em>
        </h1>

        <p ref={subRef} className={styles.subheadline}>
          Simple, practical guidance to reduce pain, restore movement, and
          support long-term joint health.
        </p>

        <div ref={searchRef} className={styles.searchWrap}>
          <div className={styles.searchIcon}>
            <IconSearch size={18} />
          </div>
          <input
            type="text"
            inputMode="search"
            enterKeyHint="search"
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles…"
            className={styles.searchInput}
            aria-label="Search blog posts"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className={styles.searchClear}
              aria-label="Clear search"
            >
              <IconX size={16} />
            </button>
          )}
        </div>

        <div ref={catsRef} className={styles.filters}>
          <Link
            href="/blog"
            className={clsx(
              styles.filterPill,
              !activeCategorySlug
                ? styles.filterPillActive
                : styles.filterPillInactive,
            )}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/${cat.slug}`}
              className={clsx(
                styles.filterPill,
                activeCategorySlug === cat.slug
                  ? styles.filterPillActive
                  : styles.filterPillInactive,
              )}
            >
              {cat.label}
              <span className={styles.catCount}>{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

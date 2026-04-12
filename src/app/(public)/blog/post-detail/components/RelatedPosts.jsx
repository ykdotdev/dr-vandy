"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconClock } from "../../components/InlineIcons";
import { blogPostPath } from "../../data/blogUrls";
import styles from "./RelatedPosts.module.css";

export default function RelatedPosts({ posts = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
    el.style.opacity = "0";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition =
            "opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    el.style.transform = "translateY(24px)";
    observer?.observe(el);
    return () => observer?.disconnect();
  }, []);

  if (!posts.length) return null;

  return (
    <div ref={ref} className={styles.section}>
      <h2 className={styles.heading}>You might also enjoy</h2>
      <div className={styles.grid}>
        {posts.map((post) => (
          <Link
            href={blogPostPath(post)}
            key={post.id}
            className={styles.cardLink}
          >
            <article className={styles.card}>
              <div className={styles.imageWrap}>
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className={styles.coverImage}
                  />
                ) : (
                  <div className={styles.mediaPlaceholder} aria-hidden />
                )}
              </div>
              <div className={styles.cardContent}>
                <div className={styles.metaRow}>
                  <span className={styles.tagCategory}>
                    {post.topic || post.category}
                  </span>
                  <span className={styles.readingMeta}>
                    <IconClock size={11} className={styles.iconShrink} />
                    {post.readingTime} min
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{post.title}</h3>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

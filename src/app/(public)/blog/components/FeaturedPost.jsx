"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconStar, IconClock, IconArrowRight } from "./InlineIcons";
import BlogAuthorAvatar from "./BlogAuthorAvatar";
import { blogPostPath } from "../data/blogUrls";
import {
  hasBlogMotionOnboarded,
  prefersReducedMotion,
} from "../data/blogMotion";
import styles from "./FeaturedPost.module.css";

export default function FeaturedPost({ post }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion() || hasBlogMotionOnboarded()) {
      el.classList.add(styles.scrollRevealVisible);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.scrollRevealVisible);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.divider} />

      <div className={styles.label}>
        <IconStar size={13} className={styles.labelIcon} />
        Featured Article
      </div>

      <div ref={ref} className={styles.scrollReveal}>
        <Link href={blogPostPath(post)} className={styles.cardLink}>
          <article className={styles.card}>
            {/* Image */}
            <div className={styles.imageWrap}>
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.coverImage}
                  priority
                />
              ) : (
                <div className={styles.mediaPlaceholder} aria-hidden />
              )}
              <div className={styles.imageOverlay} />
            </div>

            {/* Content */}
            <div className={styles.content}>
              <div>
                {/* Category + Reading time */}
                <div className={styles.metaRow}>
                  <span className={styles.tagCategory}>{post.category}</span>
                  <span className={styles.readingMeta}>
                    <IconClock size={12} className={styles.iconShrink} />
                    {post.readingTime} min read
                  </span>
                </div>

                {/* Title */}
                <h2 className={styles.title}>{post.title}</h2>

                {/* Excerpt */}
                <p className={styles.excerpt}>{post.excerpt}</p>
              </div>

              {/* Author */}
              <div className={styles.authorRow}>
                <div className={styles.authorInfo}>
                  <BlogAuthorAvatar
                    src={post.author?.avatar}
                    alt={`${post.author.name} avatar`}
                    sizePx={36}
                  />
                  <div>
                    <p className={styles.authorName}>{post.author.name}</p>
                    <p className={styles.authorDate}>{post.date}</p>
                  </div>
                </div>
                <div className={styles.readLink}>
                  <span>Read</span>
                  <IconArrowRight size={14} className={styles.readLinkIcon} />
                </div>
              </div>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
}
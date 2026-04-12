"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconClock, IconArrowRight } from "./InlineIcons";
import BlogAuthorAvatar from "./BlogAuthorAvatar";
import { blogPostPath } from "../data/blogUrls";
import {
  hasBlogMotionOnboarded,
  prefersReducedMotion,
} from "../data/blogMotion";
import styles from "./PostCard.module.css";

export default function PostCard({ post, delay = 0 }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finish = () => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.style.filter = "none";
    };

    if (prefersReducedMotion() || hasBlogMotionOnboarded()) {
      finish();
      return;
    }

    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.filter = "blur(3px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => {
            if (!el) return;
            el.style.transition = `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            el.style.filter = "blur(0)";
          }, 50);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref}>
      <Link href={blogPostPath(post)} className={styles.cardLink}>
        <article className={styles.card}>
          {/* Image */}
          <div className={styles.imageWrap}>
            {post.image ? (
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={styles.coverImage}
              />
            ) : (
              <div className={styles.mediaPlaceholder} aria-hidden />
            )}
            <div className={styles.imageOverlay} />
            {/* Category badge */}
            <div className={styles.categoryBadge}>
              <span className={styles.categoryChip}>
                {post.topic || post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className={styles.content}>
            {/* Reading time */}
            <div className={styles.metaRow}>
              <span className={styles.readingMeta}>
                <IconClock size={11} className={styles.iconShrink} />
                {post.readingTime} min read
              </span>
              <span className={styles.metaDot}>·</span>
              <span className={styles.readingMetaPlain}>{post.date}</span>
            </div>

            {/* Title */}
            <h3 className={styles.title}>{post.title}</h3>

            {/* Excerpt */}
            <p className={styles.excerpt}>{post.excerpt}</p>

            {/* Author */}
            <div className={styles.authorRow}>
              <div className={styles.authorInfo}>
                <BlogAuthorAvatar
                  src={post.author?.avatar}
                  alt={`${post.author.name} avatar`}
                  sizePx={28}
                />
                <span className={styles.authorName}>{post.author.name}</span>
              </div>
              <IconArrowRight size={14} className={styles.arrowIcon} />
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import PostCard from "./PostCard";
import { IconFileSearch } from "./InlineIcons";
import styles from "./PostGrid.module.css";

export default function PostGrid({
  posts,
  categorySlug,
  topicSlug,
  topics = [],
}) {
  const showTopics = categorySlug && topics.length > 0;

  return (
    <section className={styles.section}>
      <div className={styles.divider} />

      {showTopics && (
        <div className={styles.topicSection}>
          <p className={styles.topicSectionLabel}>Topics</p>
          <div className={styles.topicFilters}>
            <Link
              href={`/blog/${categorySlug}`}
              className={clsx(
                styles.filterPill,
                !topicSlug ? styles.filterPillActive : styles.filterPillInactive,
              )}
            >
              All topics
            </Link>
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/blog/${categorySlug}/${topic.slug}`}
                className={clsx(
                  styles.filterPill,
                  topicSlug === topic.slug
                    ? styles.filterPillActive
                    : styles.filterPillInactive,
                )}
              >
                {topic.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {posts.length === 0 ? (
        <div className={styles.empty}>
          <IconFileSearch size={40} className={styles.emptyIcon} />
          <p className={styles.emptyTitle}>No articles found</p>
          <p className={styles.emptyText}>
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} delay={(i % 3) * 100} />
          ))}
        </div>
      )}
    </section>
  );
}

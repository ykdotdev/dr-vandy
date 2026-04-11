"use client";

import React from "react";
import clsx from "clsx";
import PostCard from "./PostCard";
import { IconFileSearch } from "./InlineIcons";
import styles from "./PostGrid.module.css";

export default function PostGrid({
  posts,
  activeTopic,
  onTopicChange,
  topics = [],
}) {
  return (
    <section className={styles.section}>
      <div className={styles.divider} />

      {topics.length > 0 && (
        <div className={styles.topicSection}>
          <p className={styles.topicSectionLabel}>Topics</p>
          <div className={styles.topicFilters}>
            <button
              type="button"
              onClick={() => onTopicChange("all")}
              className={clsx(
                styles.filterPill,
                activeTopic === "all"
                  ? styles.filterPillActive
                  : styles.filterPillInactive,
              )}
            >
              All topics
            </button>
            {topics.map((topic) => (
              <button
                type="button"
                key={topic}
                onClick={() => onTopicChange(topic)}
                className={clsx(
                  styles.filterPill,
                  activeTopic === topic
                    ? styles.filterPillActive
                    : styles.filterPillInactive,
                )}
              >
                {topic}
              </button>
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

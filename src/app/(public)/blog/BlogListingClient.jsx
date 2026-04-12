"use client";

import React, { useState, useMemo } from "react";
import BlogHero from "./components/BlogHero";
import FeaturedPost from "./components/FeaturedPost";
import PostGrid from "./components/PostGrid";
import Pagination from "./components/Pagination";
import {
  POSTS_PER_PAGE,
  postMatchesTopic,
  NO_TOPIC_SLUG,
} from "./data/blogData";
import {
  resolveCategoryLabel,
  resolveTopicSegment,
  collectTopicsWithSlugsForCategory,
} from "./data/blogUrls";
import styles from "./BlogListingClient.module.css";

export default function BlogListingClient({
  allPosts,
  /** null on /blog */
  categorySlug = null,
  /** null on /blog and /blog/[cat] */
  topicSlug = null,
  categories,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const categoryLabel =
    categorySlug && allPosts.length
      ? resolveCategoryLabel(allPosts, categorySlug)
      : null;

  const postsInCategory = useMemo(() => {
    if (!categoryLabel) return allPosts;
    return allPosts.filter((p) => p.category === categoryLabel);
  }, [allPosts, categoryLabel]);

  const topicTopicsNav = useMemo(() => {
    if (!categoryLabel) return [];
    return collectTopicsWithSlugsForCategory(allPosts, categoryLabel);
  }, [allPosts, categoryLabel]);

  const globalFeatured = allPosts.find((p) => p.featured);

  const isRoot = !categorySlug && !topicSlug;

  const filteredPosts = useMemo(() => {
    let posts = categoryLabel
      ? allPosts.filter((p) => p.category === categoryLabel)
      : [...allPosts];

    if (topicSlug === NO_TOPIC_SLUG) {
      posts = posts.filter(
        (p) =>
          !(Array.isArray(p.topicValues) && p.topicValues.length) && !p.topic,
      );
    } else if (topicSlug) {
      const resolved = resolveTopicSegment(postsInCategory, topicSlug);
      if (resolved?.kind === "topic") {
        posts = posts.filter((p) => postMatchesTopic(resolved.label, p));
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          (p.topic && String(p.topic).toLowerCase().includes(q)) ||
          (p.topicValues || []).some((t) =>
            String(t).toLowerCase().includes(q),
          ) ||
          p.category.toLowerCase().includes(q) ||
          p.author.name.toLowerCase().includes(q),
      );
    }

    const showFeaturedSection =
      isRoot && !searchQuery.trim() && !!globalFeatured;

    if (showFeaturedSection && allPosts.length > 1) {
      posts = posts.filter((p) => p.id !== globalFeatured.id);
    }

    return posts;
  }, [
    allPosts,
    categoryLabel,
    topicSlug,
    postsInCategory,
    searchQuery,
    isRoot,
    globalFeatured,
  ]);

  const showFeaturedSection =
    isRoot && !searchQuery.trim() && !!globalFeatured;

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.root}>
      <main>
        <BlogHero
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          categories={categories}
          activeCategorySlug={categorySlug}
        />

        {showFeaturedSection && <FeaturedPost post={globalFeatured} />}

        <PostGrid
          posts={paginatedPosts}
          categorySlug={categorySlug}
          topicSlug={topicSlug}
          topics={topicTopicsNav}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
}

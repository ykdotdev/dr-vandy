"use client";

import React, { useState, useMemo } from "react";
import BlogHero from "./components/BlogHero";
import FeaturedPost from "./components/FeaturedPost";
import PostGrid from "./components/PostGrid";
import Pagination from "./components/Pagination";
import { POSTS_PER_PAGE, postMatchesTopic } from "./data/blogData";
import styles from "./BlogListingClient.module.css";

export default function BlogListingClient({
  blogPosts,
  categories,
  topics,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTopic, setActiveTopic] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const featuredPost = blogPosts.find((p) => p.featured);

  const showFeaturedSection =
    !!featuredPost &&
    activeCategory === "All" &&
    activeTopic === "all" &&
    !searchQuery.trim();

  const filteredPosts = useMemo(() => {
    let posts;
    if (blogPosts.length <= 1) {
      posts = [...blogPosts];
    } else if (showFeaturedSection) {
      posts = blogPosts.filter((p) => !p.featured);
    } else {
      posts = [...blogPosts];
    }

    if (activeCategory !== "All") {
      posts = posts.filter((p) => p.category === activeCategory);
    }

    if (activeTopic !== "all") {
      posts = posts.filter((p) => postMatchesTopic(activeTopic, p));
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

    return posts;
  }, [searchQuery, activeCategory, activeTopic, blogPosts, showFeaturedSection]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActiveTopic("all");
    setCurrentPage(1);
  };

  const handleTopicChange = (topic) => {
    setActiveTopic(topic);
    setCurrentPage(1);
  };

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
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
        />

        {showFeaturedSection && <FeaturedPost post={featuredPost} />}

        <PostGrid
          posts={paginatedPosts}
          activeTopic={activeTopic}
          onTopicChange={handleTopicChange}
          topics={topics}
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

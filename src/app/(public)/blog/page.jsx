import BlogCard from "@/components/blog-card";
import { BLOG_POSTS } from "@/lib/blog-data";
import styles from "./blog.module.css";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Read our latest articles and insights",
};
export default function page() {
  return (
    <>
      <Link className={styles.backBtn} href={"/"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.icon}
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span className={styles.backBtnText}>Back</span>
      </Link>
      <main className={styles.blogContainer}>
        <div className={styles.blogHeader}>
          <h1 className={styles.blogTitle}>Blogs</h1>
          <p className={styles.blogSubtitle}>
            Insights and articles on health, wellness, and better living
          </p>
        </div>

        <div className={styles.postsGrid}>
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}

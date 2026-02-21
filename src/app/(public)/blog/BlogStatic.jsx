import BlogCard from "@/components/blog-card";
import { BLOG_POSTS } from "@/lib/blog-data";
import styles from "./blog.module.css";

export const metadata = {
  title: "Blog",
  description: "Read our latest articles and insights",
};
export default function BlogStatic() {
  return (
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
  );
}

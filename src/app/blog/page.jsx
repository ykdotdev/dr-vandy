import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | Your Brand",
  description: "Articles on pain relief and body care",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <h1>Blog</h1>

      {posts.map((post) => (
        <article key={post.slug}>
          <h2>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p>{post.description}</p>
        </article>
      ))}
    </main>
  );
}

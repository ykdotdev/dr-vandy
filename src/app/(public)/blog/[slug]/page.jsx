import Image from "next/image";
import Link from "next/link";
import styles from "../post.module.css";
import { getPostBySlug, getShopifyPosts } from "@/lib/shopify-blog";

export async function generateStaticParams() {
  const posts = await getShopifyPosts();

  return posts.map((post) => ({
    slug: post.handle, // ✅ IMPORTANT FIX
  }));
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const post = await getPostBySlug(resolvedParams.slug);
  

  if (!post) {
    return { title: "Post Not Found" };
  }
  console.log(post);

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags?.join(", "),
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return (
      <main className={styles.mainContainer}>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1>Post Not Found</h1>
            <Link href="/blog" className={styles.backLink}>
              Back to Blogs
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.mainContainer}>
      <div className={styles.headerBar}>
        <Link href="/blog" className={styles.backLink}>
          ← Back to Blogs
        </Link>
      </div>

      <div className={styles.featuredImage}>
        <Image
          src={post.image?.url || "/placeholder.svg"}
          alt={post.title}
          fill
          className={styles.coverImage}
          priority
        />
      </div>

      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <h1 className={styles.postTitle}>{post.title}</h1>

          <div className={styles.metaData}>
            <span className={styles.date}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* ✅ Shopify HTML */}
        <article
          className={styles.article}
          dangerouslySetInnerHTML={{
            __html: post.contentHtml,
          }}
        />

        {/* Tags */}
        <footer className={styles.tags}>
          {post.tags?.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </footer>

        <div className={styles.footer}>
          <Link href="/blog" className={styles.backLink}>
            ← Back to Blogs
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            datePublished: post.publishedAt,
            author: {
              "@type": "Person",
              name: "Dr. Vandy's",
            },
          }),
        }}
      />
    </main>
  );
}

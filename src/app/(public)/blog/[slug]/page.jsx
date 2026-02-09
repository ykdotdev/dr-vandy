import Image from 'next/image'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog-data'
import styles from '../post.module.css'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.id,
  }))
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const post = BLOG_POSTS.find((p) => p.id === resolvedParams.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.join(", "),
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params
  const post = BLOG_POSTS.find((p) => p.id === resolvedParams.slug)

  if (!post) {
    return (
      <main className={styles.mainContainer}>
        <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ marginBottom: 'var(--spacings-xs)', fontSize: 'var(--font-sizes-l-text)', fontWeight: '600', color: 'var(--black)' }}>
              Post Not Found
            </h1>
            <Link
              href="/blog"
              className={styles.backLink}
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.mainContainer}>
      {/* Back Button */}
      <div className={styles.headerBar}>
        <div className={styles.headerContent}>
          <Link href="/blog" className={styles.backLink}>
            ← Back to Blog
          </Link>
        </div>
      </div>

      {/* Featured Image */}
      <div className={styles.featuredImage}>
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className={styles.coverImage}
          priority
        />
      </div>

      {/* Content */}
      <div className={styles.contentWrapper}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <div className={styles.metaData}>
            <span className={styles.readTime}>{post.readTime}</span>
            <span className={styles.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Article Body */}
        <article className={styles.article}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ node, ...props }) => (
                <h2 className={styles.articleHeading} {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className={styles.articleHeading} {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className={styles.articleParagraph} {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className={styles.articleList} {...props} />
              ),
              li: ({ node, ...props }) => <li {...props} />,
              strong: ({ node, ...props }) => <strong {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
          <footer className={styles.tags}>
            {post.tags.map((tag, index) => (
              <span key={tag} className={styles.tag}>
                #{tag}
                {index < post.tags.length - 1 ? ", " : ""}
              </span>
            ))}
          </footer>
        </article>

        {/* Back to Blog Link */}
        <div className={styles.footer}>
          <Link href="/blog" className={styles.backLink}>
            ← Back to Blog
          </Link>
        </div>
      </div>
    </main>
  );
}

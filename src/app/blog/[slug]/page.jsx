import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";

/* Static generation */
export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

/* SEO metadata */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = getPostBySlug(slug);

  return {
    title: data.title,
    description: data.description,
  };
}

/* Page */
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const { content, data } = getPostBySlug(slug);

  return (
    <main className="blog-wrapper">
      <article className="blog-article">
        <header className="blog-header">
          <h1>{data.title}</h1>

          {data.date && (
            <time className="blog-date">
              {new Date(data.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </header>

        {/* SEO schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: data.title,
              description: data.description,
              datePublished: data.date,
            }),
          }}
        />

        <section className="blog-content">
          <MDXRemote source={content} />
        </section>
      </article>

      {/* Basic styles */}
      <style>{`
        .blog-wrapper {
          max-width: 760px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          color: #1a1a1a;
        }

        .blog-header h1 {
          font-size: 2.2rem;
          line-height: 1.25;
          margin-bottom: 0.5rem;
        }

        .blog-date {
          font-size: 0.9rem;
          color: #666;
        }

        .blog-content {
          margin-top: 2rem;
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .blog-content h2 {
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          font-size: 1.5rem;
        }

        .blog-content h3 {
          margin-top: 2rem;
          font-size: 1.2rem;
        }

        .blog-content p {
          margin-bottom: 1rem;
        }

        .blog-content ul {
          padding-left: 1.25rem;
          margin-bottom: 1rem;
        }

        .blog-content li {
          margin-bottom: 0.5rem;
        }

        .blog-content strong {
          font-weight: 600;
        }
      `}</style>
    </main>
  );
}

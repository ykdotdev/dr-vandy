import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getReadTime } from "@/lib/shopify-blog";
import {
  getShopifyArticlesForBlog,
  resolveBlogArticle,
} from "../../../data/shopifyArticles";
import {
  DEFAULT_AUTHOR,
  formatPublishedDate,
  normalizeShopifyPosts,
  stripHtml,
  toRelatedCard,
  truncateForMetaDescription,
} from "../../../data/blogData";
import {
  findNormalizedPostByUrl,
  resolveTopicSegment,
} from "../../../data/blogUrls";
import {
  IconChevronRight,
  IconClock,
  IconArrowLeft,
} from "../../../components/InlineIcons";
import BlogAuthorAvatar from "../../../components/BlogAuthorAvatar";
import ReadingProgress from "../../../post-detail/components/ReadingProgress";
import ArticleContent from "../../../post-detail/components/ArticleContent";
import RelatedPosts from "../../../post-detail/components/RelatedPosts";
import ArticleShareActions from "../../../post-detail/components/ArticleShareActions";
import styles from "../../../post-detail/postDetail.module.css";

function readMinutesFromHtml(html) {
  const label = getReadTime(html);
  const m = String(label).match(/\d+/);
  return m ? parseInt(m[0], 10) : 5;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const raw = await getShopifyArticlesForBlog();
    const posts = normalizeShopifyPosts(raw, getReadTime);
    return posts.map((p) => ({
      categorySlug: p.categorySlug,
      topicSlug: p.topicSlug,
      postSlug: p.handle,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { categorySlug, topicSlug, postSlug } = await params;
  let allNodes = [];
  try {
    allNodes = await getShopifyArticlesForBlog();
  } catch {
    allNodes = [];
  }
  const normalized = normalizeShopifyPosts(allNodes, getReadTime);
  const match = findNormalizedPostByUrl(
    normalized,
    categorySlug,
    topicSlug,
    postSlug,
  );
  if (!match) {
    return { title: "Post Not Found" };
  }

  const post = await resolveBlogArticle(match.blogHandle, match.handle);
  if (!post) {
    return { title: "Post Not Found" };
  }

  const rawDesc =
    stripHtml(post.excerpt || "") ||
    "Pain relief, movement, and joint health insights from Dr. Vandy's.";
  const desc = truncateForMetaDescription(rawDesc);
  const kw = [post.blogTitle, post.topic, ...(post.tags || [])]
    .filter(Boolean)
    .join(", ");

  const canonicalPath = `/blog/${categorySlug}/${topicSlug}/${postSlug}`;
  const ogImage = post.image?.url
    ? [
        {
          url: post.image.url,
          alt: post.image?.altText || post.title,
        },
      ]
    : undefined;

  return {
    title: `${post.title} | Dr. Vandy's Blog`,
    description: desc,
    keywords: kw || undefined,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: post.title,
      description: desc,
      type: "article",
      url: canonicalPath,
      siteName: "Dr. Vandy's",
      locale: "en_US",
      publishedTime: post.publishedAt,
      ...(ogImage ? { images: ogImage } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: desc,
      ...(ogImage ? { images: [post.image.url] } : {}),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const { categorySlug, topicSlug, postSlug } = await params;

  let allNodes = [];
  try {
    allNodes = await getShopifyArticlesForBlog();
  } catch {
    allNodes = [];
  }

  const normalized = normalizeShopifyPosts(allNodes, getReadTime);
  const match = findNormalizedPostByUrl(
    normalized,
    categorySlug,
    topicSlug,
    postSlug,
  );
  if (!match) {
    notFound();
  }

  const post = await resolveBlogArticle(match.blogHandle, match.handle);
  if (!post) {
    notFound();
  }

  const others = normalized.filter(
    (p) =>
      !(
        p.blogHandle === match.blogHandle &&
        p.handle === match.handle
      ),
  );
  const sameBlog = others.filter((p) => p.blogHandle === match.blogHandle);
  const rest = others.filter((p) => p.blogHandle !== match.blogHandle);
  const related = [...sameBlog, ...rest].slice(0, 3).map(toRelatedCard);

  const blogTitle = post.blogTitle || "Blog";
  const chipLabel = blogTitle;

  const excerpt =
    stripHtml(post.excerpt || "") ||
    stripHtml(post.contentHtml || "").slice(0, 220);
  const readingTime = readMinutesFromHtml(post.contentHtml);
  const date = formatPublishedDate(post.publishedAt);
  const imageUrl = post.image?.url || "";
  const imageAlt = post.image?.altText || post.title || "Article image";
  const authorName =
    String(post.authorV2?.name || "").trim() || DEFAULT_AUTHOR.name;
  const author = {
    ...DEFAULT_AUTHOR,
    name: authorName,
    postCount: allNodes.length,
  };

  const siteOrigin = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://drvandys.com"
  ).replace(/\/$/, "");
  const canonicalUrl = `${siteOrigin}/blog/${categorySlug}/${topicSlug}/${postSlug}`;
  const schemaDescription = truncateForMetaDescription(excerpt);
  const keywordLine = [post.topic, ...(post.tags || [])]
    .filter(Boolean)
    .join(", ");
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: schemaDescription,
    datePublished: post.publishedAt,
    url: canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    author: {
      "@type": "Person",
      name: author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Dr. Vandy's",
      url: siteOrigin,
    },
    articleSection: blogTitle,
    inLanguage: "en-US",
    ...(imageUrl ? { image: [imageUrl] } : {}),
    ...(keywordLine ? { keywords: keywordLine } : {}),
  };

  const articlePath = `/blog/${categorySlug}/${topicSlug}/${postSlug}`;

  const inCategory = normalized.filter((p) => p.category === match.category);
  const topicSeg = resolveTopicSegment(inCategory, topicSlug);
  const topicCrumbLabel =
    topicSeg?.kind === "general"
      ? "General"
      : topicSeg?.kind === "topic"
        ? topicSeg.label
        : "Topic";

  return (
    <div className={styles.page}>
      <ReadingProgress />
      <main className={styles.main}>
        <div className={styles.heroImage}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className={styles.heroCoverImage}
            />
          ) : (
            <div className={styles.heroPlaceholder} aria-hidden />
          )}
          <div className={styles.heroScrim} />
        </div>

        <div className={styles.articleContainer}>
          <div className={styles.articleInner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/blog" className={styles.breadcrumbLink}>
                Blog
              </Link>
              <IconChevronRight size={12} className={styles.breadcrumbIcon} />
              <Link
                href={`/blog/${categorySlug}`}
                className={styles.breadcrumbLink}
              >
                {blogTitle}
              </Link>
              <IconChevronRight size={12} className={styles.breadcrumbIcon} />
              <Link
                href={`/blog/${categorySlug}/${topicSlug}`}
                className={styles.breadcrumbLink}
              >
                {topicCrumbLabel}
              </Link>
            </nav>

            <div className={styles.metaRow}>
              <div className={styles.metaWrapper}>
                <span className={styles.tagCategory}>{chipLabel}</span>
                <span className={styles.readingMeta}>
                  <IconClock size={12} className={styles.iconShrink} />
                  {readingTime} min read
                </span>
              </div>
              <span className={styles.readingMetaPlain}>{date}</span>
            </div>

            <h1 className={styles.title}>{post.title}</h1>

            <p className={styles.excerpt}>{excerpt}</p>

            <div className={styles.authorRow}>
              <BlogAuthorAvatar
                src={author.avatar}
                alt={`${author.name} portrait`}
                sizePx={48}
              />
              <div>
                <Link href="/about" className={styles.authorName}>
                  {author.name}
                </Link>
                <p className={styles.authorBio}>{author.bio}</p>
              </div>
            </div>

            <ArticleContent html={post.contentHtml} />

            <div className={styles.shareRow}>
              <Link href="/blog" className={styles.backLink}>
                <IconArrowLeft size={16} className={styles.iconShrink} />
                Back to all articles
              </Link>
              <ArticleShareActions articlePath={articlePath} title={post.title} />
            </div>

            <div className={styles.authorCard}>
              <div className={styles.authorCardAvatarSlot}>
                <BlogAuthorAvatar
                  src={author.avatar}
                  alt={`${author.name} portrait`}
                  sizePx={64}
                />
              </div>
              <div>
                <p className={styles.authorCardLabel}>Written by</p>
                <Link href="/about" className={styles.authorCardName}>
                  {author.name}
                </Link>
                <p className={styles.authorCardBio}>{author.bio}</p>
                <p className={styles.authorCardCount}>
                  {author.postCount} articles published
                </p>
              </div>
            </div>

            <RelatedPosts posts={related} />
          </div>
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema),
        }}
      />
    </div>
  );
}

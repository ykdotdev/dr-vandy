import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { getReadTime } from "@/lib/shopify-blog";
import {
  getShopifyArticlesForBlog,
  resolveBlogArticle,
} from "../../data/shopifyArticles";
import {
  DEFAULT_AUTHOR,
  formatPublishedDate,
  normalizeShopifyPosts,
  stripHtml,
  toRelatedCard,
  truncateForMetaDescription,
} from "../../data/blogData";
import { IconChevronRight, IconClock, IconArrowLeft } from "../../components/InlineIcons";
import BlogAuthorAvatar from "../../components/BlogAuthorAvatar";
import ReadingProgress from "../components/ReadingProgress";
import ArticleContent from "../components/ArticleContent";
import RelatedPosts from "../components/RelatedPosts";
import ArticleShareActions from "../components/ArticleShareActions";
import styles from "../postDetail.module.css";

function readMinutesFromHtml(html) {
  const label = getReadTime(html);
  const m = String(label).match(/\d+/);
  return m ? parseInt(m[0], 10) : 5;
}

function normalizeSlugParam(slug) {
  if (slug == null) return [];
  const parts = [];
  const pushPart = (raw) => {
    const t = String(raw ?? "").trim();
    if (!t) return;
    try {
      parts.push(decodeURIComponent(t));
    } catch {
      parts.push(t);
    }
  };
  if (Array.isArray(slug)) {
    for (const item of slug) {
      const s = String(item ?? "");
      if (s.includes("/")) {
        s.split("/").forEach(pushPart);
      } else {
        pushPart(s);
      }
    }
  } else {
    String(slug)
      .split("/")
      .forEach(pushPart);
  }
  return parts.filter(Boolean);
}

async function loadPostForMeta(segments) {
  if (segments.length === 2) {
    return resolveBlogArticle(segments[0], segments[1]);
  }
  if (segments.length === 1) {
    const all = await getShopifyArticlesForBlog();
    const found = all.find((a) => a.handle === segments[0]);
    if (!found?.blogHandle) return null;
    return resolveBlogArticle(found.blogHandle, found.handle);
  }
  return null;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const posts = await getShopifyArticlesForBlog();
    return posts.map((post) => ({
      slug: [post.blogHandle, post.handle],
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const segments = normalizeSlugParam((await params).slug);
  if (segments.length === 0) {
    return { title: "Blog | Dr. Vandy's" };
  }
  const post = await loadPostForMeta(segments);

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

  const canonicalPath = `/blog/post-detail/${post.blogHandle}/${post.handle}`;
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

export default async function BlogPostDetailPage({ params }) {
  const segments = normalizeSlugParam((await params).slug);

  if (segments.length === 0) {
    redirect("/blog");
  }

  if (segments.length === 1) {
    const all = await getShopifyArticlesForBlog();
    const found = all.find((a) => a.handle === segments[0]);
    if (found?.blogHandle && found?.handle) {
      redirect(`/blog/post-detail/${found.blogHandle}/${found.handle}`);
    }
    notFound();
  }

  if (segments.length !== 2) {
    notFound();
  }

  const [blogHandle, articleHandle] = segments;

  let allNodes = [];
  try {
    allNodes = await getShopifyArticlesForBlog();
  } catch {
    allNodes = [];
  }

  const post = await resolveBlogArticle(blogHandle, articleHandle);

  if (!post) {
    notFound();
  }

  const normalized = normalizeShopifyPosts(allNodes, getReadTime);
  const others = normalized.filter(
    (p) => !(p.blogHandle === blogHandle && p.handle === articleHandle),
  );
  const sameBlog = others.filter((p) => p.blogHandle === blogHandle);
  const rest = others.filter((p) => p.blogHandle !== blogHandle);
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
  const canonicalUrl = `${siteOrigin}/blog/post-detail/${blogHandle}/${articleHandle}`;
  const schemaDescription = truncateForMetaDescription(excerpt);
  const keywordLine = [post.topic, ...(post.tags || [])].filter(Boolean).join(", ");
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
              <span>{blogTitle}</span>
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
              <ArticleShareActions
                articlePath={`/blog/post-detail/${blogHandle}/${articleHandle}`}
                title={post.title}
              />
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

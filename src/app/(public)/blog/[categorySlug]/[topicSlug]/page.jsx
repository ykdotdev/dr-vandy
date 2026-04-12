import { notFound } from "next/navigation";
import { getReadTime } from "@/lib/shopify-blog";
import BlogListingClient from "../../BlogListingClient";
import {
  normalizeShopifyPosts,
  buildSeoKeywordsFromPosts,
  truncateForMetaDescription,
} from "../../data/blogData";
import {
  buildCategoryNavItems,
  resolveCategoryLabel,
  resolveTopicSegment,
} from "../../data/blogUrls";
import { getShopifyArticlesForBlog } from "../../data/shopifyArticles";

export async function generateMetadata({ params }) {
  const { categorySlug, topicSlug } = await params;
  let shopifyNodes = [];
  try {
    shopifyNodes = await getShopifyArticlesForBlog();
  } catch {
    shopifyNodes = [];
  }
  const blogPosts = normalizeShopifyPosts(shopifyNodes, getReadTime);
  const label = resolveCategoryLabel(blogPosts, categorySlug);
  if (!label) {
    return { title: "Not found | Dr. Vandy's Blog" };
  }
  const inCat = blogPosts.filter((p) => p.category === label);
  const topicRes = resolveTopicSegment(inCat, topicSlug);
  if (!topicRes) {
    return { title: "Topic not found | Dr. Vandy's Blog" };
  }

  const topicTitle =
    topicRes.kind === "general"
      ? "General"
      : topicRes.label;
  const scoped =
    topicRes.kind === "general"
      ? inCat.filter(
          (p) =>
            !(Array.isArray(p.topicValues) && p.topicValues.length) &&
            !p.topic,
        )
      : inCat.filter((p) => {
          const want = topicRes.label.toLowerCase().trim();
          const vals =
            Array.isArray(p.topicValues) && p.topicValues.length
              ? p.topicValues
              : p.topic
                ? [p.topic]
                : [];
          return vals.some(
            (t) =>
              String(t).toLowerCase().trim().replace(/\s+/g, " ") === want,
          );
        });

  const keywords = buildSeoKeywordsFromPosts(scoped);
  const desc = truncateForMetaDescription(
    `${topicTitle} articles in ${label} — ${scoped.length} piece${scoped.length === 1 ? "" : "s"} from Dr. Vandy's.`,
  );

  return {
    title: `${topicTitle} — ${label} | Dr. Vandy's Blog`,
    description: desc,
    keywords: keywords || undefined,
    alternates: {
      canonical: `/blog/${categorySlug}/${topicSlug}`,
    },
    openGraph: {
      title: `${topicTitle} — ${label} | Dr. Vandy's Blog`,
      description: desc,
      type: "website",
      url: `/blog/${categorySlug}/${topicSlug}`,
      siteName: "Dr. Vandy's",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${topicTitle} — ${label}`,
      description: desc,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogTopicPage({ params }) {
  const { categorySlug, topicSlug } = await params;
  let shopifyNodes = [];
  try {
    shopifyNodes = await getShopifyArticlesForBlog();
  } catch {
    shopifyNodes = [];
  }

  const blogPosts = normalizeShopifyPosts(shopifyNodes, getReadTime);
  const label = resolveCategoryLabel(blogPosts, categorySlug);
  if (!label) {
    notFound();
  }
  const inCat = blogPosts.filter((p) => p.category === label);
  if (!resolveTopicSegment(inCat, topicSlug)) {
    notFound();
  }

  const categories = buildCategoryNavItems(blogPosts);

  return (
    <BlogListingClient
      allPosts={blogPosts}
      categorySlug={categorySlug}
      topicSlug={topicSlug}
      categories={categories}
    />
  );
}

import { getReadTime } from "@/lib/shopify-blog";
import { getSiteUrl } from "@/lib/siteUrl";
import { getShopifyArticlesForBlog } from "@/app/(public)/blog/data/shopifyArticles";
import { normalizeShopifyPosts } from "@/app/(public)/blog/data/blogData";
import {
  NO_TOPIC_SLUG,
  blogPostPath,
  buildCategoryNavItems,
  collectTopicsWithSlugsForCategory,
} from "@/app/(public)/blog/data/blogUrls";

function maxPublishedDate(posts) {
  const times = posts
    .map((p) => new Date(p.publishedAt || 0).getTime())
    .filter((t) => !Number.isNaN(t));
  if (!times.length) return new Date();
  return new Date(Math.max(...times));
}

export default async function sitemap() {
  const baseUrl = getSiteUrl();

  let articles = [];
  try {
    articles = await getShopifyArticlesForBlog();
  } catch {
    articles = [];
  }

  const normalized = normalizeShopifyPosts(articles, getReadTime);

  const blogPostUrls = normalized.map((p) => ({
    url: `${baseUrl}${blogPostPath(p)}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
  }));

  const categoryNav = buildCategoryNavItems(normalized);
  const categoryUrls = categoryNav.map(({ slug, label }) => {
    const inCat = normalized.filter((p) => p.category === label);
    return {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: maxPublishedDate(inCat),
    };
  });

  const topicUrls = [];
  for (const { slug: catSlug, label } of categoryNav) {
    const inCat = normalized.filter((p) => p.category === label);
    for (const t of collectTopicsWithSlugsForCategory(normalized, label)) {
      const inTopic =
        t.slug === NO_TOPIC_SLUG
          ? inCat.filter(
              (p) =>
                !(
                  Array.isArray(p.topicValues) && p.topicValues.length > 0
                ) && !p.topic,
            )
          : inCat.filter((p) =>
              (
                Array.isArray(p.topicValues) && p.topicValues.length > 0
                  ? p.topicValues
                  : p.topic
                    ? [p.topic]
                    : []
              ).some(
                (v) =>
                  String(v).trim().toLowerCase() ===
                  String(t.label).trim().toLowerCase(),
              ),
            );
      topicUrls.push({
        url: `${baseUrl}/blog/${catSlug}/${t.slug}`,
        lastModified: maxPublishedDate(inTopic),
      });
    }
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: maxPublishedDate(normalized),
    },
    ...categoryUrls,
    ...topicUrls,
    ...blogPostUrls,
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
  ];
}

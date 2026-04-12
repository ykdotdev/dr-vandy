import { slugify, NO_TOPIC_SLUG, blogPostPath } from "./blogUrls";

export const POSTS_PER_PAGE = 6;

export { slugify, NO_TOPIC_SLUG, blogPostPath };

export const DEFAULT_AUTHOR = {
  name: "Dr. Vandy's",
  avatar: "/blog/profile.jpeg",
  bio: "Thoughtful perspectives on care, wellness, and everyday life.",
  postCount: 0,
};

export function stripHtml(html) {
  if (!html || typeof html !== "string") return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

/** Snippet-friendly length for meta descriptions and JSON-LD. */
export function truncateForMetaDescription(text, max = 158) {
  const t = String(text || "")
    .trim()
    .replace(/\s+/g, " ");
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

function readMinutesFromHtml(html, getReadTime) {
  if (typeof getReadTime !== "function") return 5;
  const label = getReadTime(html);
  const m = String(label).match(/\d+/);
  return m ? parseInt(m[0], 10) : 5;
}

export function formatPublishedDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function normalizeTagList(tags) {
  if (!Array.isArray(tags)) return [];
  return [...new Set(tags.map((t) => String(t).trim()).filter(Boolean))];
}

/**
 * Shopify topic metafield may be plain text, comma-separated, or JSON (list / quoted string).
 * Returns a non-empty list of topic labels for filters and display.
 */
export function parseTopicValues(raw) {
  if (raw == null) return [];
  let s = String(raw).trim();
  if (!s) return [];

  if (s.startsWith("[") && s.endsWith("]")) {
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) {
        return [
          ...new Set(
            parsed
              .map((x) => String(x ?? "").trim().replace(/\s+/g, " "))
              .filter(Boolean),
          ),
        ];
      }
    } catch {
      /* fall through */
    }
  }

  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    try {
      const inner = JSON.parse(s);
      if (typeof inner === "string" && inner.trim()) {
        return [inner.trim().replace(/\s+/g, " ")];
      }
    } catch {
      return [s.slice(1, -1).trim().replace(/\s+/g, " ")].filter(Boolean);
    }
  }

  if (s.includes(",")) {
    return [
      ...new Set(
        s
          .split(",")
          .map((x) => x.trim().replace(/\s+/g, " "))
          .filter(Boolean),
      ),
    ];
  }

  return [s.replace(/\s+/g, " ")];
}

export function postMatchesTopic(activeTopic, post) {
  const want = String(activeTopic || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
  if (!want || want === "all") return true;
  const values =
    Array.isArray(post.topicValues) && post.topicValues.length > 0
      ? post.topicValues
      : post.topic
        ? [post.topic]
        : [];
  return values.some(
    (t) =>
      String(t)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ") === want,
  );
}

/**
 * Maps flattened Shopify article nodes (see shopifyArticles.js) to UI shape.
 * `category` = Shopify blog title; `topic` = article metafield when set.
 */
export function normalizeShopifyPosts(shopifyNodes, getReadTime) {
  if (!Array.isArray(shopifyNodes) || shopifyNodes.length === 0) {
    return [];
  }
  const total = shopifyNodes.length;

  return shopifyNodes.map((node, i) => {
    const excerptRaw = node.excerpt || "";
    const fromBody = stripHtml(node.contentHtml || "");
    const excerpt =
      stripHtml(excerptRaw) ||
      (fromBody.length > 180 ? `${fromBody.slice(0, 180)}…` : fromBody);

    const tags = normalizeTagList(node.tags);
    const blogTitle = String(node.blogTitle || "").trim() || "Blog";
    const topicValues = parseTopicValues(node.topic);
    const topic = topicValues[0] || "";
    const categorySlug = slugify(blogTitle);
    const topicSlug = topicValues[0] ? slugify(topicValues[0]) : NO_TOPIC_SLUG;
    const authorName =
      String(node.authorV2?.name || "").trim() || DEFAULT_AUTHOR.name;

    return {
      id: node.id || `${node.blogHandle}-${node.handle}`,
      handle: node.handle,
      blogHandle: node.blogHandle || "",
      title: node.title || "Untitled",
      excerpt,
      category: blogTitle,
      categorySlug,
      topic,
      topicSlug,
      topicValues,
      tags,
      date: formatPublishedDate(node.publishedAt),
      readingTime: readMinutesFromHtml(node.contentHtml, getReadTime),
      image: node.image?.url || "",
      imageAlt: node.image?.altText || node.title || "Article image",
      author: {
        ...DEFAULT_AUTHOR,
        name: authorName,
        postCount: total,
      },
      featured: i === 0,
    };
  });
}

/** Category pills = Shopify blog titles (+ counts). */
export function buildCategoriesFromPosts(posts) {
  const counts = new Map();
  for (const p of posts) {
    const label = p.category || "Blog";
    counts.set(label, (counts.get(label) || 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => a[0].localeCompare(b[0], undefined, { sensitivity: "base" }))
    .map(([label, count]) => ({ label, count }));
}

/** Topic pills (Shopify article `topic` metafield only). */
export function collectTopicsFromPosts(posts, limit = 20) {
  const set = new Set();
  for (const p of posts) {
    const vals =
      Array.isArray(p.topicValues) && p.topicValues.length > 0
        ? p.topicValues
        : p.topic
          ? [p.topic]
          : [];
    for (const v of vals) {
      if (v) set.add(String(v).trim());
    }
  }
  return Array.from(set)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .slice(0, limit);
}

export function buildSeoKeywordsFromPosts(posts) {
  const set = new Set();
  for (const p of posts) {
    if (p.category) set.add(p.category);
    const tvs =
      Array.isArray(p.topicValues) && p.topicValues.length > 0
        ? p.topicValues
        : p.topic
          ? [p.topic]
          : [];
    for (const v of tvs) {
      if (v) set.add(String(v).trim());
    }
    for (const t of p.tags || []) {
      if (t) set.add(String(t).trim());
    }
  }
  return Array.from(set).join(", ");
}

export function toRelatedCard(post) {
  return {
    id: post.id,
    handle: post.handle,
    blogHandle: post.blogHandle,
    title: post.title,
    category: post.category,
    categorySlug: post.categorySlug,
    topic: post.topic,
    topicSlug: post.topicSlug,
    topicValues: post.topicValues,
    readingTime: post.readingTime,
    date: post.date,
    image: post.image,
    imageAlt: post.imageAlt,
  };
}

/**
 * URL segments for SEO: /blog/[categorySlug]/[topicSlug]/[postHandle]
 */

export const NO_TOPIC_SLUG = "general";

export function slugify(text) {
  const s = String(text || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s || "item";
}

export function blogPostPath(post) {
  return `/blog/${post.categorySlug}/${post.topicSlug}/${post.handle}`;
}

export function resolveCategoryLabel(posts, categorySlug) {
  if (!categorySlug || !Array.isArray(posts)) return null;
  const labels = [...new Set(posts.map((p) => p.category).filter(Boolean))];
  return labels.find((l) => slugify(l) === categorySlug) ?? null;
}

function topicLabelsInPosts(posts) {
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
  return Array.from(set);
}

/**
 * Resolve second URL segment inside a category. Returns null if invalid.
 */
export function resolveTopicSegment(postsInCategory, topicSlug) {
  if (!topicSlug) return null;
  if (topicSlug === NO_TOPIC_SLUG) {
    return { kind: "general" };
  }
  const labels = topicLabelsInPosts(postsInCategory);
  const label = labels.find((t) => slugify(t) === topicSlug);
  if (!label) return null;
  return { kind: "topic", label };
}

export function buildCategoryNavItems(posts) {
  const counts = new Map();
  for (const p of posts) {
    const label = p.category || "Blog";
    counts.set(label, (counts.get(label) || 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) =>
      a[0].localeCompare(b[0], undefined, { sensitivity: "base" }),
    )
    .map(([label, count]) => ({
      label,
      count,
      slug: slugify(label),
    }));
}

export function collectTopicsWithSlugsForCategory(posts, categoryLabel) {
  const inCat = posts.filter((p) => p.category === categoryLabel);
  const items = [];
  const hasUntopic = inCat.some(
    (p) =>
      !(Array.isArray(p.topicValues) && p.topicValues.length) && !p.topic,
  );
  if (hasUntopic) {
    items.push({ label: "General", slug: NO_TOPIC_SLUG });
  }
  const labels = topicLabelsInPosts(inCat).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );
  for (const label of labels) {
    items.push({ label, slug: slugify(label) });
  }
  return items;
}

export function findNormalizedPostByUrl(posts, categorySlug, topicSlug, postHandle) {
  return (
    posts.find(
      (p) =>
        p.categorySlug === categorySlug &&
        p.topicSlug === topicSlug &&
        p.handle === postHandle,
    ) ?? null
  );
}

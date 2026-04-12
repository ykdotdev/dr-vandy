import { notFound, permanentRedirect } from "next/navigation";
import { getReadTime } from "@/lib/shopify-blog";
import { getShopifyArticlesForBlog } from "../../data/shopifyArticles";
import { normalizeShopifyPosts } from "../../data/blogData";
import { blogPostPath } from "../../data/blogUrls";

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

/** 301 to canonical /blog/[category]/[topic]/[post] */
export default async function LegacyPostDetailRedirect({ params }) {
  const segments = normalizeSlugParam((await params).slug);
  let allNodes = [];
  try {
    allNodes = await getShopifyArticlesForBlog();
  } catch {
    allNodes = [];
  }
  const normalized = normalizeShopifyPosts(allNodes, getReadTime);

  let match = null;
  if (segments.length === 2) {
    const [blogHandle, handle] = segments;
    match = normalized.find(
      (p) => p.blogHandle === blogHandle && p.handle === handle,
    );
  } else if (segments.length === 1) {
    const [handle] = segments;
    match = normalized.find((p) => p.handle === handle);
  }

  if (!match) {
    notFound();
  }

  permanentRedirect(blogPostPath(match));
}

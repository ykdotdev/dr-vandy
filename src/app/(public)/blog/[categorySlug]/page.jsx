import { notFound } from "next/navigation";
import { getReadTime } from "@/lib/shopify-blog";
import BlogListingClient from "../BlogListingClient";
import {
  normalizeShopifyPosts,
  buildSeoKeywordsFromPosts,
  truncateForMetaDescription,
} from "../data/blogData";
import {
  buildCategoryNavItems,
  resolveCategoryLabel,
} from "../data/blogUrls";
import { getShopifyArticlesForBlog } from "../data/shopifyArticles";

export async function generateMetadata({ params }) {
  const { categorySlug } = await params;
  let shopifyNodes = [];
  try {
    shopifyNodes = await getShopifyArticlesForBlog();
  } catch {
    shopifyNodes = [];
  }
  const blogPosts = normalizeShopifyPosts(shopifyNodes, getReadTime);
  const label = resolveCategoryLabel(blogPosts, categorySlug);
  if (!label) {
    return { title: "Category not found | Dr. Vandy's Blog" };
  }
  const inCat = blogPosts.filter((p) => p.category === label);
  const keywords = buildSeoKeywordsFromPosts(inCat);
  const desc = truncateForMetaDescription(
    `Read ${inCat.length} article${inCat.length === 1 ? "" : "s"} in ${label} — joint care, pain relief, and movement from Dr. Vandy's.`,
  );

  return {
    title: `${label} | Dr. Vandy's Blog`,
    description: desc,
    keywords: keywords || undefined,
    alternates: {
      canonical: `/blog/${categorySlug}`,
    },
    openGraph: {
      title: `${label} | Dr. Vandy's Blog`,
      description: desc,
      type: "website",
      url: `/blog/${categorySlug}`,
      siteName: "Dr. Vandy's",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${label} | Dr. Vandy's Blog`,
      description: desc,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogCategoryPage({ params }) {
  const { categorySlug } = await params;
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

  const categories = buildCategoryNavItems(blogPosts);

  return (
    <BlogListingClient
      allPosts={blogPosts}
      categorySlug={categorySlug}
      topicSlug={null}
      categories={categories}
    />
  );
}

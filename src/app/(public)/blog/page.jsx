import { getReadTime } from "@/lib/shopify-blog";
import BlogListingClient from "./BlogListingClient";
import {
  normalizeShopifyPosts,
  buildSeoKeywordsFromPosts,
  truncateForMetaDescription,
} from "./data/blogData";
import { buildCategoryNavItems } from "./data/blogUrls";
import { getShopifyArticlesForBlog } from "./data/shopifyArticles";

export async function generateMetadata() {
  let shopifyNodes = [];
  try {
    shopifyNodes = await getShopifyArticlesForBlog();
  } catch {
    shopifyNodes = [];
  }
  const blogPosts = normalizeShopifyPosts(shopifyNodes, getReadTime);
  const keywords = buildSeoKeywordsFromPosts(blogPosts);
  const listingDesc = truncateForMetaDescription(
    "Expert-angled articles on joint care, back health, muscle recovery, daily movement, and supportive pain relief — from Dr. Vandy's.",
  );

  return {
    title: "Blog | Dr. Vandy's — pain relief, movement & joint health",
    description: listingDesc,
    keywords: keywords || undefined,
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title: "Dr. Vandy's Blog",
      description: truncateForMetaDescription(
        "Pain relief, arthritis care, posture, muscle recovery, and everyday movement — grounded in physiotherapy-informed thinking.",
      ),
      type: "website",
      url: "/blog",
      siteName: "Dr. Vandy's",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "Dr. Vandy's Blog",
      description: truncateForMetaDescription(
        "Joint care, back health, muscle recovery, and pain relief tips.",
      ),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogListingPage() {
  let shopifyNodes = [];
  try {
    shopifyNodes = await getShopifyArticlesForBlog();
  } catch {
    shopifyNodes = [];
  }

  const blogPosts = normalizeShopifyPosts(shopifyNodes, getReadTime);
  const categories = buildCategoryNavItems(blogPosts);

  return (
    <BlogListingClient
      allPosts={blogPosts}
      categorySlug={null}
      topicSlug={null}
      categories={categories}
    />
  );
}

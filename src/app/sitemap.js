import { getShopifyArticlesForBlog } from "@/app/(public)/blog/data/shopifyArticles";

export default async function sitemap() {
  let articles = [];
  try {
    articles = await getShopifyArticlesForBlog();
  } catch {
    articles = [];
  }

  const blogPostUrls = articles.map((a) => ({
    url: `https://drvandys.com/blog/post-detail/${a.blogHandle}/${a.handle}`,
    lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
  }));

  return [
    {
      url: "https://drvandys.com",
      lastModified: new Date(),
    },
    {
      url: "https://drvandys.com/blog",
      lastModified: new Date(),
    },
    {
      url: "https://drvandys.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://drvandys.com/contact",
      lastModified: new Date(),
    },
    ...blogPostUrls,
  ];
}

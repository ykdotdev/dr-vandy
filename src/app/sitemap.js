import { BLOG_POSTS } from "@/lib/blog-data";

export default function sitemap() {
    const blogUrls = BLOG_POSTS.map((post) => ({
        url: `https://drvandys.com/blog/${post.slug}`,
        lastModified: new Date(post.date),
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
    ...blogUrls,
  ];
}

/**
 * Blog-local Shopify Storefront fetch: all blogs → articles with tags, author,
 * optional topic metafield, and parent blog title/handle (category).
 */

const API_VERSION = "2024-01";

function topicMetafieldArgs() {
  const ns = process.env.SHOPIFY_ARTICLE_TOPIC_NAMESPACE || "custom";
  const key = process.env.SHOPIFY_ARTICLE_TOPIC_KEY || "topic";
  return { ns, key };
}

/** Prefer storefront `metafields(identifiers:)`; fall back to singular `metafield`. */
function topicFromArticleNode(node) {
  if (!node) return "";
  const fromList = node.metafields?.find((m) => m?.value != null && String(m.value).trim());
  if (fromList?.value != null) {
    return String(fromList.value).trim();
  }
  if (node.metafield?.value != null) {
    return String(node.metafield.value).trim();
  }
  return "";
}

function articleFieldsFragment() {
  const { ns, key } = topicMetafieldArgs();
  return `
    id
    title
    handle
    excerpt
    contentHtml
    tags
    publishedAt
    image { url altText }
    authorV2 { name }
    metafield(namespace: "${ns}", key: "${key}") { value }
    metafields(identifiers: [{ namespace: "${ns}", key: "${key}" }]) {
      namespace
      key
      value
    }
  `;
}

function safeBlogHandle(blog) {
  const h = String(blog?.handle || "").trim();
  if (h) return h;
  const t = String(blog?.title || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return t || "blog";
}

function flattenArticles(json) {
  const out = [];
  const edges = json?.data?.blogs?.edges || [];
  for (const { node: blog } of edges) {
    if (!blog) continue;
    const bh = safeBlogHandle(blog);
    const arts = blog.articles?.edges || [];
    for (const { node } of arts) {
      if (!node) continue;
      out.push({
        ...node,
        blogTitle: blog.title || "",
        blogHandle: bh,
        topic: topicFromArticleNode(node),
      });
    }
  }
  out.sort((a, b) => {
    const ta = new Date(a.publishedAt || 0).getTime();
    const tb = new Date(b.publishedAt || 0).getTime();
    return tb - ta;
  });
  return out;
}

export async function getShopifyArticlesForBlog() {
  const fields = articleFieldsFragment();
  const query = `
  {
    blogs(first: 25) {
      edges {
        node {
          title
          handle
          articles(first: 50, sortKey: PUBLISHED_AT, reverse: true) {
            edges {
              node {
                ${fields}
              }
            }
          }
        }
      }
    }
  }
  `;

  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
  if (!domain || !token) {
    return [];
  }

  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query }),
    // next: { revalidate: 60 },
  });

  const json = await res.json();
  if (json.errors?.length) {
    console.error("[blog] Shopify GraphQL:", json.errors);
  }
  return flattenArticles(json);
}

/**
 * Match article from a flattened list (case-insensitive blog handle).
 */
export function findArticleInList(articles, blogHandle, articleHandle) {
  const bh = String(blogHandle || "").trim();
  const ah = String(articleHandle || "").trim();
  if (!bh || !ah || !Array.isArray(articles)) return null;
  const bhLower = bh.toLowerCase();
  return (
    articles.find(
      (a) =>
        a.handle === ah &&
        String(a.blogHandle || "").toLowerCase() === bhLower,
    ) || null
  );
}

/**
 * Prefer list match (same payload as the blog index); fall back to articleByHandle.
 */
export async function resolveBlogArticle(blogHandle, articleHandle) {
  const all = await getShopifyArticlesForBlog();
  const fromList = findArticleInList(all, blogHandle, articleHandle);
  if (fromList) return fromList;
  return getShopifyArticleByBlogAndHandle(blogHandle, articleHandle);
}

/**
 * Single article by Shopify blog handle + article handle (Storefront).
 */
export async function getShopifyArticleByBlogAndHandle(blogHandle, articleHandle) {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
  if (!domain || !token || !blogHandle || !articleHandle) {
    return null;
  }

  const fields = articleFieldsFragment();
  const query = `
    query($blogHandle: String!, $articleHandle: String!) {
      blog(handle: $blogHandle) {
        title
        handle
        articleByHandle(handle: $articleHandle) {
          ${fields}
        }
      }
    }
  `;

  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query,
      variables: { blogHandle, articleHandle },
    }),
    // next: { revalidate: 60 },
  });

  const json = await res.json();
  if (json.errors?.length) {
    console.error("[blog] articleByHandle:", json.errors);
  }

  const blog = json?.data?.blog;
  const art = blog?.articleByHandle;
  if (!blog || !art) {
    return null;
  }

  return {
    ...art,
    blogTitle: blog.title || "",
    blogHandle: safeBlogHandle(blog),
    topic: topicFromArticleNode(art),
  };
}

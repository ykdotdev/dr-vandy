// lib/shopify-blog.ts
export async function getShopifyPosts() {
  const query = `
  {
    blogs(first: 1) {
      edges {
        node {
          articles(first: 20) {
            edges {
              node {
                id
                title
                handle
                excerpt
                contentHtml
                image {
                  url
                }
                publishedAt
              }
            }
          }
        }
      }
    }
  }
  `;

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    },
  );

  const json = await res.json();
  console.log(json);
  console.log(JSON.stringify(json, null, 2));
  return json.data.blogs.edges[0].node.articles.edges.map((edge) => edge.node);
}

export async function getPostBySlug(slug) {
  const query = `
  {
    articles(first: 1, query: "handle:${slug}") {
      edges {
        node {
          title
          handle
          excerpt
          contentHtml
          publishedAt
          image {
            url
          }
          tags
        }
      }
    }
  }
  `;

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
        next: { revalidate: 60 },
    },
  );

  const json = await res.json();
  return json.data.articles.edges[0]?.node;
}

export function getReadTime(html) {
  if (!html) return "1 min read";

  // remove HTML tags
  const text = html.replace(/<[^>]*>/g, "");

  const words = text.trim().split(/\s+/).length;

  const minutes = Math.ceil(words / 200);

  return `${minutes} min read`;
}
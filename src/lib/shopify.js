export async function shopifyFetch(query, variables = {}) {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/api/2023-10/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store", // important for fresh data
    },
  );

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Shopify API error");
  }

  return json.data;
}

export async function POST(req) {
  const { lineItems } = await req.json();

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: `mutation ($input: CartInput!) {
        cartCreate(input: $input) {
          cart { id checkoutUrl }
        }
      }`,
        variables: { input: { lines: lineItems } },
      }),
    },
  );

  const data = await res.json();
  return Response.json(data);
}

export const GET_VARIANTS_BY_IDS = `
query ($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on ProductVariant {
      id
      title
      availableForSale

      price {
        amount
        currencyCode
      }
      compareAtPrice {
        amount
      }

      image {
        url
        altText
      }

      product {
        title
        handle

      }

      metafield(namespace: "custom", key: "shipping_status") {
        value
      }
    }
  }
}
`;

export const GET_VARIANTS_BY_SLUG = `
query getProduct($handle: String!) {
  product(handle: $handle) {
    id
    title
    handle
    images(first: 10) {
    edges {
      node {
        url
      }
    }
  }

    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale

          price {
            amount
            currencyCode
          }

          compareAtPrice {
            amount
          }


          shipping_status: metafield(namespace: "custom", key: "shipping_status") {
            value
          }

            qty_in_pack: metafield(namespace: "custom", key: "qty_in_pack") {
            value
          }
        }
      }
    }
  }
}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  pageExtensions: ["js", "jsx", "mdx"],

  devIndicators: {
    buildActivity: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },

};

export default nextConfig;

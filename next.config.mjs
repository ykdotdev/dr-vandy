/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  pageExtensions: ["js", "jsx", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "itcioasmcvbiavlxclvq.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/supabase/:path*",
        destination: "https://itcioasmcvbiavlxclvq.supabase.co/:path*",
      },
    ];
  },
};

export default nextConfig;

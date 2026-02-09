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
};

export default nextConfig;

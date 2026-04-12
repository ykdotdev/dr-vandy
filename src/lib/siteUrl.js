/**
 * Canonical site origin (no trailing slash). Use for metadata, JSON-LD, sitemap.
 */
export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://drvandys.com").replace(
    /\/$/,
    "",
  );
}

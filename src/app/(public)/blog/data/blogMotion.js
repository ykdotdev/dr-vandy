/** Session flag: user has completed (or skipped) blog entrance motion once. */
export const BLOG_MOTION_SESSION_KEY = "dr-vandy-blog-motion-onboarded";

export function hasBlogMotionOnboarded() {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(BLOG_MOTION_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function markBlogMotionOnboarded() {
  try {
    sessionStorage.setItem(BLOG_MOTION_SESSION_KEY, "1");
  } catch {
    /* private mode / quota */
  }
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

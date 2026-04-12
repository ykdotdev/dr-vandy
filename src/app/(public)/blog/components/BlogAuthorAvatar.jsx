"use client";

import Image from "next/image";
import clsx from "clsx";
import styles from "./BlogAuthorAvatar.module.css";

export const BLOG_DEFAULT_PROFILE = "/blog/profile.jpg";

export default function BlogAuthorAvatar({ src, alt, sizePx, className }) {
  const imageSrc = src || BLOG_DEFAULT_PROFILE;

  return (
    <span
      className={clsx(styles.frame, className)}
      style={{ width: sizePx, height: sizePx }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes={`${sizePx}px`}
        className={styles.image}
      />
    </span>
  );
}

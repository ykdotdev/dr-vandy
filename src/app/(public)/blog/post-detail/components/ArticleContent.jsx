import React from "react";
import clsx from "clsx";
import styles from "./ArticleContent.module.css";

export default function ArticleContent({ html }) {
  return (
    <div
      id="article-content"
      className={clsx(styles.root, styles.article)}
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
}

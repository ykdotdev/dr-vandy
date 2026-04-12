"use client";

import React from "react";
import { useToast } from "@/components/ToastProvider";
import { IconShare, IconLink } from "../../components/InlineIcons";
import styles from "../postDetail.module.css";

export default function ArticleShareActions({ articlePath, title }) {
  const toast = useToast();

  const getPageUrl = () => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${articlePath}`;
  };

  const shareArticle = async () => {
    const url = getPageUrl();
    if (!url) return;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: title,
          url,
        });
        return;
      } catch (err) {
        if (err && err.name === "AbortError") return;
      }
    }

    const text = encodeURIComponent(title);
    const u = encodeURIComponent(url);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${u}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const copyLink = async () => {
    const url = getPageUrl();
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      toast?.showToast("Link copied to clipboard", "success");
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        toast?.showToast("Link copied to clipboard", "success");
      } catch {
        toast?.showToast("Could not copy link", "error");
      }
    }
  };

  return (
    <div className={styles.shareGroup}>
      <span className={styles.shareLabel}>Share</span>
      <button
        type="button"
        className={styles.shareBtn}
        aria-label="Share article"
        onClick={shareArticle}
      >
        <IconShare size={15} className={styles.iconShrink} />
      </button>
      <button
        type="button"
        className={styles.shareBtn}
        aria-label="Copy link"
        onClick={copyLink}
      >
        <IconLink size={15} className={styles.iconShrink} />
      </button>
    </div>
  );
}

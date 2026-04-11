import Link from 'next/link'
import Image from 'next/image'
import styles from './blog-card.module.css'
import { getReadTime } from '@/lib/shopify-blog';

export default function BlogCard({ post }) {
  const readTime = getReadTime(post.contentHtml);
  return (
    <Link href={`/blog/${post.handle}`}>
      <article className={styles.cardContainer}>
        <div className={styles.cardImage}>
          {console.log(post)}
          <Image
            src={post.image?.url || "/placeholder.svg"}
            alt={post.title}
            fill
            className={styles.image}
            loading="eager"
          />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.readTime}>
            <span className={styles.label}>{readTime}</span>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.header}>
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.excerpt}>{post.excerpt}</p>
            </div>
          </div>
          <div className={styles.cta}>Read more</div>
        </div>
      </article>
    </Link>
  );
}

import Link from 'next/link'
import Image from 'next/image'
import styles from './blog-card.module.css'

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.id}`}>
      <article className={styles.cardContainer}>
        <div className={styles.cardImage}>
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className={styles.image}
            loading="eager"
          />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.readTime}>
            <span className={styles.label}>{post.readTime}</span>
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

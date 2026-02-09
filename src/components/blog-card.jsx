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
        <div className={styles.cardContent}>
          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <div className={styles.meta}>
            <span className={styles.readTime}>{post.readTime}</span>
            <span className={styles.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

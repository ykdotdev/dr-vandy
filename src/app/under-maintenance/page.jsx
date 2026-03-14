import styles from './page.module.css'

export default function ComingSoon() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Under Maintenance</h1>
        <p className={styles.subheading}>We’re working on something new.</p>
      </div>
    </main>
  );
}

import clsx from 'clsx';
import styles from './FeatureCard.module.css'

const FeatureCard = ({iconPath, heading, description, number}) => {
  return (
    <div className={clsx(styles.featureCard, styles[`n${number}`])}>
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.icon}
      >{iconPath}</svg>
      <div className={styles.textCtn}>
        <span className={styles.heading}>{heading}</span>
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
}

export default FeatureCard

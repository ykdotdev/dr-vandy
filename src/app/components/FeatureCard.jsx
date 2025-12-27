import {React, props} from "react";
import styles from './FeatureCard.module.css';


const FeatureCard = ({icon, index, headingText, subheadingText}) => {
  return (

    

    <div className={styles.featureCard}>
        <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.icon}
              >
              {icon}
         </svg>
      <div className={styles.card}>
        <div className={styles.headingCtn}>
          <span className={styles.headingIndex}>{index}</span>
          <span className={styles.headingText}>{headingText}</span>
        </div>
        <span className={styles.subheadingText}>{subheadingText}</span>
      </div>
    </div>
  );
};

export default FeatureCard;

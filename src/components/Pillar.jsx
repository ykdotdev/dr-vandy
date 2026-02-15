import clsx from 'clsx';
import styles from './Pillar.module.css'

const Pillar = ({label, number}) => {
  return (
    <div className={clsx(styles.pillar, styles[`n${number}`])}>
      <div className={styles.indicator}></div>
      <span className={styles.label}>
        {label}
      </span>
    </div>
  );
}

export default Pillar

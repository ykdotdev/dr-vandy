import clsx from 'clsx';
import styles from './StatusIndicator.module.css'

const StatusIndicator = ({status}) => {
  return (
    <div className={clsx(styles.statusIndicator, styles[status])}>
      <span className={styles.statusText}>{status}</span>
    </div>
  );
}

export default StatusIndicator

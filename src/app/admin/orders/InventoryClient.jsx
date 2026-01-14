import styles from './InventoryClient.module.css'

const InventoryClient = () => {
  return (
    <div className={styles.mainInventoryCtn}>
      <div className={styles.header}>
        <div className={styles.itemDetailsContainer}>
          <div className={styles.imageCtn}>{/*  */}</div>
          <div className={styles.textCtn}>
            <span className={styles.text}>
              Dr. Vandy’s OrthoHemp™ Pain Relief Oil
            </span>
          </div>
        </div>
        <span className={styles.descriptionText}>
          Fast Relief • Reduces Inflammation • Improves Mobility
        </span>
      </div>
      <div className={styles.variantCards}>
        <div className={styles.variantCard}>
            <div className={styles.header}>
                <span className={styles.variantName}>Pack of 1</span>
                <button className={styles.editButton}>
                    Edit Details
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryClient

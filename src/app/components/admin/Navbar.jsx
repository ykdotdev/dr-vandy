import React from 'react';
import styles from './Navbar.module.css'
import clsx from 'clsx';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>Dr. Vandy's</span>
      <div className={styles.navMenu}>
        <div className={clsx(styles.navItem, styles.navItem01)}>
          {/* SVG */}
          <span className={styles.label}>Inventory</span>
        </div>
        <div className={clsx(styles.navItem, styles.navItem02)}>
          {/* SVG */}
          <span className={styles.label}>Orders</span>
        </div>
      </div>
      <button className={styles.logoutBtn}>
        {/* SVG */}
      </button>
    </div>
  );
}

export default Navbar

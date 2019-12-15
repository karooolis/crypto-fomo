import React from 'react';
import styles from './FallingMoney.module.css';

const FallingMoney = props => {
  return (
    <div className={`${styles['money-container']} ${props.roi !== 0 ? (props.roi > 0 ? styles.success : styles.failure) : null}`}>
      <div className={styles['falling-money']}>
        <span className={styles['falling-money-span']} />
        <span className={styles['falling-money-span']} />
        <span className={styles['falling-money-span']} />
        <span className={styles['falling-money-span']} />
        <span className={styles['falling-money-span']} />
        <span className={styles['falling-money-span']} />
        <span className={styles['falling-money-span']} />
        <span className={styles['falling-money-span']} />
        <span className={styles['falling-money-span']} />
        <span className={styles['falling-money-span']} />
        <span className={styles['falling-money-span']} />
        <span className={styles['falling-money-span']} />
        <span className={styles['falling-money-span']} />
        <span className={styles['falling-money-span']} />
        <span className={styles['falling-money-span']} />
        <span className={styles['falling-money-span']} />
        <span className={styles['falling-money-span']} />
      </div>
    </div>
  );
};

export default FallingMoney;

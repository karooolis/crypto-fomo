import React from 'react';
import styles from './Affiliate.css';

const Affiliate = () => {
  return (
    <div className={styles.affiliate}>
      <marquee direction="right">
        <p>
          👉{' '}
          <a href="http://bit.ly/2KGoLgg" target="_blank">
            <span className={styles.link}>Buy Bitcoin with a credit card</span> 💰
          </a>
        </p>
      </marquee>

      <p className={styles.disclaimer}>Disclaimer: Site contains affiliate links. Invest at your own risk.</p>
    </div>
  );
};

export default Affiliate;

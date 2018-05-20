import React from 'react';
import styles from './Affiliate.css';

const Affiliate = () => {
  return (
    <div className={styles.affiliate}>
      {/* <marquee>
        <p>
          👉{' '}
          <a href="http://bit.ly/2ghb9hO" target="_blank">
            <span className={styles.link}>Get a free stock on robinhood</span> 🤑
          </a>
        </p>
      </marquee> */}

      <marquee direction="right">
        <p>
          👉{' '}
          <a href="https://www.coinbase.com/join/59a92e3605fa0102376d5012" target="_blank">
            <span className={styles.link}>Get $10 to Buy Bitcoin</span> 💰
          </a>
        </p>
      </marquee>

      <p className={styles.disclaimer}>Disclaimer: Site contains affiliate links. Invest at your own risk.</p>
    </div>
  );
};

export default Affiliate;

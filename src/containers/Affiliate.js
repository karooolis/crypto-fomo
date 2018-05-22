import React from 'react';
import styles from './Affiliate.css';

const Affiliate = () => {
  return (
    <div className={styles.affiliate}>
      <marquee direction="right">
        <p>
          👉{' '}
          <a href="https://n.exchange/?ref=RRVQKYQ8PQV" target="_blank">
            <span className={styles.link}>Buy cryptocurrencies with the cheapest rates</span> 💰
          </a>
        </p>
      </marquee>

      <p className={styles.disclaimer}>Disclaimer: Site contains affiliate links. Invest at your own risk.</p>
    </div>
  );
};

export default Affiliate;

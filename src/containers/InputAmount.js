import React from 'react';
import styles from './InputAmount.css';

const InputAmount = () => {
  return (
    <div>
      <span className={styles.dollar}>$</span>
      <input type="number" className={styles.input} value="1000" />
    </div>
  );
};

export default InputAmount;

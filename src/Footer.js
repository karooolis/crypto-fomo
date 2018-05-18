import React from 'react';
import { Row, Col } from 'react-grid-system';
import styles from './Footer.css';

const Footer = () => {
  return (
    <Row>
      <Col md={4} push={{ md: 8 }}>
        <p>
          Inspired by <a href="http://www.extremefomo.com/">Extreme Fomo</a>
        </p>
        <p className={styles.footer}>
          <a href="https://twitter.com/superkarolis">@superkarolis</a>
        </p>
      </Col>
    </Row>
  );
};

export default Footer;

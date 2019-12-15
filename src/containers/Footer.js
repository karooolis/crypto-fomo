import React from 'react';
import { Row, Col } from 'react-grid-system';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <Row className={styles.footer}>
      <Col md={4} push={{ md: 8 }}>
        <p>
          Inspired by{' '}
          <a href="http://www.extremefomo.com/" target="_blank">
            Extreme Fomo
          </a>
        </p>
        <p>
          <a href="https://twitter.com/originalkarolis" target="_blank">
            @originalkarolis
          </a>
        </p>
      </Col>
    </Row>
  );
};

export default Footer;

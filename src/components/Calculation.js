import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import styles from './Calculation.css';

class Calculation extends Component {
  state = { coins: [], coin: 'Bitcoin', date: '2018-05-26', amount: '1000', loading: true, error: false };

  componentDidMount = () => {
    const {
      match: { params },
    } = this.props;

    console.log(params);

    fetch(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${params.coin}&tsyms=USD&ts=1516658836&extraParams=cryptofomo`)
      .then(res => res.json())
      .then(json => {
        console.log(json.data.length);
        this.setState({ loading: true });
      })
      .catch(err => this.setState({ loading: false, error: true }));
  };

  render() {
    const {
      match: { params },
    } = this.props;

    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <div className={styles['money-container']}>
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
            <span className={styles['falling-money-span']} />
            <span className={styles['falling-money-span']} />
            <span className={styles['falling-money-span']} />
            <span className={styles['falling-money-span']} />
          </div>
        </div>

        <Row>
          <Col>
            {!this.state.error ? (
              <h1 className={styles.header}>
                Investing <span className={styles.span}>${params.amount}</span> in <span className={styles.span}>{params.coin}</span> on{' '}
                <span className={styles.span}>{params.date}</span> would have yielded <span className={styles.span}>$1364.75</span> which is
                a <span className={styles.span}>236.48%</span> on ROI.
              </h1>
            ) : (
              <h1 className={styles['header-wrong']}>Hmm. Data not available 🙅 Sorry!</h1>
            )}
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Link to={`/`}>
              <button type="button" className={styles.button}>
                See another
              </button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Calculation;

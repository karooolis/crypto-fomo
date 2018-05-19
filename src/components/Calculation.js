import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { fetchCoin, dispatchError } from '../actions';
import styles from './Calculation.css';

class Calculation extends Component {
  state = { roi: 0, netProfit: 0, coinsFetched: false, roiCalculated: false };

  componentDidMount = () => {
    if (this.props.coins.length) {
      this.fetchCoinData();
    }
  };

  fetchCoinData() {
    const {
      match: { params },
    } = this.props;

    const date = new Date(params.date);
    const ts = Math.floor(date / 1000);

    if (ts > Math.floor(new Date() / 1000)) {
      this.props.dispatchError('Future dates are invalid');
      return;
    }

    const coin = _.find(this.props.coins, { name: params.coin });

    this.props.fetchCoin(coin.symbol, ts);
    this.setState({ coinsFetched: true });
  }

  calculateRoi() {
    const {
      match: { params },
    } = this.props;

    const coinsBought = parseFloat(params.amount) / this.props.coin.past;
    const totalValue = coinsBought * this.props.coin.current;
    const netProfit = totalValue - parseFloat(params.amount);
    const roi = netProfit / parseFloat(params.amount) * 100;

    this.setState({
      roi: roi.toFixed(2),
      netProfit: netProfit.toFixed(2),
      roiCalculated: true,
    });
  }

  componentDidUpdate = prevProps => {
    if (this.props.coins.length && !this.state.coinsFetched) {
      this.fetchCoinData();
    }

    if (this.props.coin.past && this.props.coin.current && !this.state.roiCalculated) {
      this.calculateRoi();
    }
  };

  render() {
    const {
      match: { params },
    } = this.props;

    let header;
    if (!this.props.coins.length) {
      header = <h1 className={styles.header}>Loading...</h1>;
    } else {
      if (!this.props.error) {
        if (this.state.roi >= 0) {
          header = (
            <h1 className={styles.header}>
              Investing <span className={styles.span}>${params.amount}</span> in <span className={styles.span}>{params.coin}</span> on{' '}
              <span className={styles.span}>{params.date}</span> would have made me{' '}
              <span className={styles.span}>${this.state.netProfit}</span> which is a <span className={styles.span}>{this.state.roi}%</span>{' '}
              on ROI.
            </h1>
          );
        } else {
          header = (
            <h1 className={styles.header}>
              Phew. I got lucky! 🎉 Investing <span className={styles.span}>${params.amount}</span> in{' '}
              <span className={styles.span}>{params.coin}</span> on <span className={styles.span}>{params.date}</span> would have made me
              lose <span className={styles.span}>${(parseFloat(params.amount) - this.state.totalValue).toFixed(2)}</span>. That's a{' '}
              <span className={styles.span}>{this.state.roi}%</span> loss.
            </h1>
          );
        }
      } else {
        header = <h1 className={styles['header-wrong']}>Hmm. Data not available 🙅 Sorry!</h1>;
      }
    }

    return (
      <div>
        <div
          className={`${styles['money-container']} ${this.state.roi !== 0 ? (this.state.roi > 0 ? styles.success : styles.failure) : null}`}
        >
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

        <Row>
          <Col>{header}</Col>
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

const mapStateToProps = ({ coins, coin, error }) => ({ coins, coin, error });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchCoin, dispatchError }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Calculation);

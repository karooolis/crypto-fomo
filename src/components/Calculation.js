import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import fontawesome from '@fortawesome/fontawesome';
import { faTwitter } from '@fortawesome/fontawesome-free-brands';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import { fetchCoin, dispatchError, receiveCoin } from '../actions';
import FallingMoney from '../containers/FallingMoney';
import styles from './Calculation.css';

fontawesome.library.add(faTwitter);

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
    } else if (this.props.coin.past === 0 || this.props.coin.current === 0) {
      this.props.dispatchError('Date too early');
    }
  };

  componentWillUnmount() {
    this.setState({
      roi: 0,
      netProfit: 0,
      coinsFetched: false,
      roiCalculated: false,
    });

    this.props.receiveCoin(null, null);
    this.props.dispatchError(null);
  }

  renderHeader() {
    const {
      match: { params },
    } = this.props;

    if (this.props.error) {
      return <h1 className={styles['header-wrong']}>Hmm. Data not available 🙅 Sorry!</h1>;
    } else if (!this.state.coinsFetched || !this.state.roiCalculated) {
      return <h1 className={styles.header}>Loading...</h1>;
    } else {
      if (this.state.roi >= 0) {
        const twitterStr = `Investing $${params.amount} in ${params.coin} on 📅 ${params.date} would have made me $${
          this.state.netProfit
        } 💸 which is a ${this.state.roi}% on ROI 📈 See more on ${window.location.href} 🎉 #FOMO #${params.coin} #crypto #ToTheMoon`;

        return (
          <h1 className={styles.header}>
            Investing <span className={styles.span}>${params.amount}</span> in <span className={styles.span}>{params.coin}</span> on{' '}
            <span className={styles.span}>{params.date}</span> would have made me{' '}
            <span className={styles.span}>${this.state.netProfit} 💸</span> which is a{' '}
            <span className={styles.span}>{this.state.roi}% 📈</span> on ROI.
            <a
              className="twitter-share-button"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterStr)}`}
              target="_blank"
            >
              <FontAwesomeIcon className={styles.svg} icon={['fab', 'twitter']} />
            </a>
          </h1>
        );
      } else {
        const twitterStr = `Phew. I got lucky! 🎉 Investing $${params.amount} in ${params.coin} on {params.date} would have made me lose ${
          this.state.netProfit
        } bucks 💸 That's a ${this.state.roi}% loss 📉 See more on ${window.location.href} #FOMO #${params.coin} #crypto #CryptoBubble`;

        return (
          <h1 className={styles.header}>
            Phew. I got lucky! 🎉 Investing <span className={styles.span}>${params.amount}</span> in{' '}
            <span className={styles.span}>{params.coin}</span> on <span className={styles.span}>{params.date}</span> would have made me lose{' '}
            <span className={styles.span}>{Math.abs(this.state.netProfit)}</span> bucks. That's a{' '}
            <span className={styles.span}>{this.state.roi}%</span> loss.{' '}
            <a
              className="twitter-share-button"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterStr)}`}
              target="_blank"
            >
              <FontAwesomeIcon className={styles.svg} icon={['fab', 'twitter']} />
            </a>
          </h1>
        );
      }
    }
  }

  render() {
    return (
      <div>
        <FallingMoney roi={this.state.roi} />

        <Row>
          <Col>{this.renderHeader()}</Col>
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
const mapDispatchToProps = dispatch => bindActionCreators({ fetchCoin, dispatchError, receiveCoin }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Calculation);

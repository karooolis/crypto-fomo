import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { receiveCards } from '../actions';
import money from '../img/money.png';
import Options from '../containers/Options';
import Footer from '../containers/Footer';
import styles from './Home.css';

class Home extends Component {
  state = { coin: 'Bitcoin', date: '2017-01-01', amount: '1000' };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleFocus = event => {
    const cards = this.props.coins
      .filter(coin =>
        ['BTC', 'ETH', 'LTC', 'XMR', 'XRP', 'BCH', 'EOS', 'LTC', 'XLM', 'TRX', 'MIOTA', 'NEO', 'DASH', 'XEM'].includes(coin.symbol)
      )
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    this.props.receiveCards(cards);

    console.log(cards);
  };

  render() {
    return (
      <div>
        <Row>
          <Col>
            <img src={money} alt="Money" className={styles['header-img']} />
            <h1 className={styles.header}>If I had Invested</h1>
          </Col>
        </Row>

        <Row>
          <Col sm={3}>
            <span className={styles.dollar}>$</span>
            <input type="number" name="amount" className={styles.input} value={this.state.amount} onChange={this.handleChange} />
          </Col>
          <Col sm={1} className="text-center">
            <div className={styles.filler}>in</div>
          </Col>
          <Col sm={3} className="text-center">
            <input type="text" name="coin" value={this.state.coin} onChange={this.handleChange} onFocus={this.handleFocus} />
            <p className={styles.example}>Example - BTC, Bitcoin</p>
          </Col>
          <Col sm={1} className="text-center">
            <div className={styles.filler}>on</div>
          </Col>
          <Col sm={4}>
            <input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
          </Col>
        </Row>

        <Row>
          <Col md={3} push={{ md: 4 }}>
            <Options coin={this.state.coin} onClick={coin => this.setState({ coin })} />
          </Col>

          <Col md={4} push={{ md: 5 }}>
            <Link to={`/${this.state.amount}/${this.state.date}/${this.state.coin}`}>
              <button type="button">submit</button>
            </Link>
          </Col>
        </Row>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ coins }) => ({ coins });
const mapDispatchToProps = dispatch => bindActionCreators({ receiveCards }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

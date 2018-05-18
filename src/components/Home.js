import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import Options from '../containers/Options';
import Footer from '../containers/Footer';
import money from '../img/money.png';
import styles from './Home.css';

class Home extends Component {
  state = { coins: [], coin: 'Bitcoin', date: '2018-05-26', amount: '1000' };

  componentDidMount = () => {
    // https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=1516658836&extraParams=cryptofomo

    fetch('https://api.coinmarketcap.com/v2/listings/')
      .then(res => res.json())
      .then(json => this.setState({ coins: json.data }))
      .catch(err => console.log(err));
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {};

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
          <Col sm={3}>
            <input type="text" name="coin" value={this.state.coin} onChange={this.handleChange} />
            <p className="example">Example - BTC, Bitcoin</p>
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
            <Options coin={this.state.coin} coins={this.state.coins} onClick={coin => this.setState({ coin })} />
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

export default Home;

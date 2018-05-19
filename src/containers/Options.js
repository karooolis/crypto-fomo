import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fuse from 'fuse.js';
import styles from './Options.css';

class Options extends Component {
  constructor(props) {
    super(props);

    if (this.props.coins.length) {
      this.init();
    }
  }

  state = { cards: [], clicked: false };

  init = () => {
    const options = {
      shouldSort: true,
      threshold: 0.2,
      keys: ['name', 'symbol'],
    };
    this.fuse = new Fuse(this.props.coins, options);
  };

  search = () => {
    const cards = this.fuse.search(this.props.coin);
    this.setState({ cards });
  };

  componentDidUpdate = prevProps => {
    if (!prevProps.coins.length && this.props.coins.length) {
      this.init();
    }

    if (prevProps.coin !== this.props.coin && this.props.coins.length && !this.state.clicked) {
      this.search();
    }

    if (this.state.clicked) {
      this.setState({ clicked: false });
    }
  };

  render() {
    return (
      <ul className={styles.list}>
        {this.state.cards.map(coin => (
          <li
            className={styles.card}
            key={coin.id}
            onClick={() => {
              this.setState({ cards: [], clicked: true });
              this.props.onClick(coin.name);
            }}
          >
            <p className={styles.name}>{coin.name}</p>
            <p className={styles.symbol}>{coin.symbol}</p>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = ({ coins }) => ({ coins });

export default connect(mapStateToProps)(Options);

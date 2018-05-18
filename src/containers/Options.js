import React, { Component } from 'react';
import Fuse from 'fuse.js';
import styles from './Options.css';

class Options extends Component {
  state = { cards: [] };

  init = () => {
    const options = {
      shouldSort: true,
      threshold: 0.3,
      keys: ['name', 'symbol'],
    };
    this.fuse = new Fuse(this.props.coins, options);
  };

  search = () => {
    this.setState({
      cards: this.fuse.search(this.props.coin),
    });
  };

  componentDidUpdate = prevProps => {
    if (!prevProps.coins.length && this.props.coins.length) {
      this.init();
    }

    if (prevProps.coin !== this.props.coin && this.props.coins.length) {
      this.search();
    }
  };

  renderList = () =>
    this.state.cards.map(coin => (
      <li className={styles.card} key={coin.id}>
        <p className={styles.name}>{coin.name}</p>
        <p className={styles.symbol}>{coin.symbol}</p>
      </li>
    ));

  render() {
    return <ul className={styles.list}>{this.renderList()}</ul>;
  }
}

export default Options;

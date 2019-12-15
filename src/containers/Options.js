import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Fuse from 'fuse.js';
import { receiveCards } from '../actions';
import styles from './Options.module.css';

class Options extends Component {
  constructor(props) {
    super(props);

    if (this.props.coins.length) {
      this.init();
    }
  }

  state = { clicked: false };

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
    this.props.receiveCards(cards);
  };

  handleClickOutside = () => {
    this.props.receiveCards([]);
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
        {this.props.cards.map(coin => (
          <li
            className={styles.card}
            key={coin.id}
            onClick={() => {
              this.setState({ clicked: true });
              this.props.receiveCards([]);
              this.props.onClick(coin.name);
            }}
          >
            <p className={styles.name}>
              {coin.name} ({coin.symbol})
            </p>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = ({ coins, cards }) => ({ coins, cards });
const mapDispatchToProps = dispatch => bindActionCreators({ receiveCards }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Options);

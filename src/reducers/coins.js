import { RECEIVE_COINS } from '../actions';

const coins = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_COINS:
      return action.coins;
    default:
      return state;
  }
};

export default coins;

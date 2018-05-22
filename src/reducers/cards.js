import { RECEIVE_CARDS } from '../actions';

const coin = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CARDS:
      return action.cards;
    default:
      return state;
  }
};

export default coin;

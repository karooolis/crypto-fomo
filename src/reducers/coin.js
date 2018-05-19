import { RECEIVE_COIN } from '../actions';

const coin = (state = { past: null, current: null }, action) => {
  switch (action.type) {
    case RECEIVE_COIN:
      return { past: action.price.past, current: action.price.current };
    default:
      return state;
  }
};

export default coin;

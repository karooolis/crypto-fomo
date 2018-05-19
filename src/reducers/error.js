import { ERROR } from '../actions';

const coins = (state = null, action) => {
  switch (action.type) {
    case ERROR:
      return action.error;
    default:
      return state;
  }
};

export default coins;

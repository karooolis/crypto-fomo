import { combineReducers } from 'redux';
import coins from './coins';
import coin from './coin';
import error from './error';
import cards from './cards';

export default combineReducers({
  coins,
  coin,
  error,
  cards,
});

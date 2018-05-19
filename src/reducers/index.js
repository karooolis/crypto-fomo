import { combineReducers } from 'redux';
import coins from './coins';
import coin from './coin';
import error from './error';

export default combineReducers({
  coins,
  coin,
  error,
});

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import 'babel-polyfill';
import App from './components/App';
import rootReducer from './reducers';
import { fetchCoins } from './actions';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
store.dispatch(fetchCoins());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

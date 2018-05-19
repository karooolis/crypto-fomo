import fetch from 'cross-fetch';

export const RECEIVE_COINS = 'RECEIVE_COINS';
export const receiveCoins = coins => ({
  type: RECEIVE_COINS,
  coins,
});

export const RECEIVE_COIN = 'RECEIVE_COIN';
export const receiveCoin = (past, current) => ({
  type: RECEIVE_COIN,
  price: {
    past,
    current,
  },
});

export const ERROR = 'ERROR';
export const dispatchError = error => ({
  type: ERROR,
  error,
});

export const fetchCoins = () => dispatch =>
  fetch('https://api.coinmarketcap.com/v2/listings/')
    .then(res => res.json())
    .then(json => dispatch(receiveCoins(json.data)))
    .catch(err => dispatch(dispatchError(err)));

export const fetchCoin = (symbol, timestamp) => dispatch => {
  let fetchPastPrice = fetch(
    `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${symbol}&tsyms=USD&ts=${timestamp}&extraParams=cryptofomo`
  )
    .then(res => res.json())
    .then(json => {
      return json[symbol]['USD'];
    });

  let fetchCurrentPrice = fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbol}&tsyms=USD&extraParams=cryptofomo`)
    .then(res => res.json())
    .then(json => {
      return json[symbol]['USD'];
    });

  return Promise.all([fetchPastPrice, fetchCurrentPrice])
    .then(([past, current]) => dispatch(receiveCoin(past, current)))
    .catch(err => dispatch(dispatchError(err)));
};

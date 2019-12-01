import Constants from '../constants';

export const fetchNewGame = (callback) => fetch(Constants.NEWGAME_URL)
  .then((results) => results.json())
  .then(callback);

export const postVictory = (params, callback) => fetch(Constants.VICTORY_URL, {
  method: 'post',
  body: JSON.stringify(params),
})
  .then((results) => results.json())
  .then(callback);

export const fetchVictory = (callback) => fetch(Constants.VICTORY_URL)
  .then((results) => results.json())
  .then(callback);

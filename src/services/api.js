import Constants from '../constants';

export const fetchNewGame = (callback) => fetch(Constants.NEWGAME_URL, {
  method: 'post',
})
  .then((results) => results.json())
  .then(callback);

export const postVictory = (params, callback) => fetch(Constants.VICTORY_URL, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(params),
})
  .then((results) => results.json())
  .then(callback);

export const fetchVictory = (params, callback) => fetch(`${Constants.VICTORY_URL}/${params.id}`)
  .then((results) => results.json())
  .then(callback);

import Constants from '../constants';

const fetchNewGame = (callback) => fetch(Constants.NEWGAME_URL)
  .then((results) => results.json())
  .then(callback);

export default fetchNewGame;

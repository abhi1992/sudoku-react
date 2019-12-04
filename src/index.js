import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Router } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import history from './history';
import Home from './pages/home';
import About from './pages/about';
import Constants from './constants';
import NewGame from './pages/newgame';
import Victory from './pages/victory';


ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={() => <Home game={Constants.GAME_NAME} history={history} />} />
      <Route
        exact path="/new" history={history}
        component={NewGame}
      />
      <Route
        exact path="/victory/:id"
        render={(props) => <Victory {...props} history={history} />}
      />
      <Route exact path="/about" render={() => <About game={Constants.GAME_NAME} history={history} version={Constants.Version} />} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import AddPersonPage from 'containers/AddPersonPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import HistoryPage from 'containers/HistoryPage';
import MatchmakingListPage from 'containers/MatchmakingListPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './style.scss';
import logo from './logo.png';

export default function App() {
  return (
    <div>
      <header id="navbar">
        <img id="img" alt={'logo'.toString()} src={logo} />
        <div>
          <Button id="LinkButton">
            <Link to="/add-person">Add Person </Link>
          </Button>
          <Button id="LinkButton">
            {' '}
            <Link to="/matchmakeing-list"> / Matchmakeing List </Link>
          </Button>
          <Button id="LinkButton">
            {' '}
            <Link to="/history"> / History</Link>{' '}
          </Button>
        </div>
      </header>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/add-person" component={AddPersonPage} />
        <Route
          exact
          path="/matchmakeing-list"
          component={MatchmakingListPage}
        />
        <Route exact path="/history" component={HistoryPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

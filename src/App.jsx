import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './Store/history';
import LoginPage from './Pages/Login';
import HomePage from './Pages/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;

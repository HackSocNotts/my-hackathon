import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import history from './Store/history';
import Login from './Components/Pages/Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/login" component={Login} />
      </Router>
    );
  }
}

export default App;

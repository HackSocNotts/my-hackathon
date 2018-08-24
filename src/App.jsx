import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import history from './Store/history';
import RequireAuth from './Components/requireAuth';
import LoginPage from './Pages/Login';
import HomePage from './Pages/Home';
import TeamPage from './Pages/Team';
import AdminPage from './Pages/Admin';
import ApplicationPage from './Pages/Application';
import theme from './theme';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={RequireAuth(HomePage)} exact />
            <Route path="/application" component={RequireAuth(ApplicationPage)} />
            <Route path="/team" component={RequireAuth(TeamPage)} />
            <Route path="/admin" component={RequireAuth(AdminPage)} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </ConnectedRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;

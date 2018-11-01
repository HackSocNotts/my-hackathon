/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './Store';
import registerServiceWorker from './registerServiceWorker';
import authNavigationSync from './Utlis/AuthNavigation/sync';
import { getEvents } from './Modules/Eventbrite';
import { getGeneralSettings } from './Modules/Settings';
import 'typeface-roboto';

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root'),
  );
};

render(App);
authNavigationSync();
store.dispatch(getEvents());
store.dispatch(getGeneralSettings());
registerServiceWorker();

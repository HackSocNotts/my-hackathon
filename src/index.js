/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './Store';
import registerServiceWorker from './registerServiceWorker';
import authNavigationSync from './Utlis/AuthNavigation/sync';
import { GET_EVENT } from './Modules/Eventbrite';
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
store.dispatch({ type: GET_EVENT });
registerServiceWorker();

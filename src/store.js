/*
  For router integratoin
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
*/
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers';
import { firebaseEnhancer, firestoreEnhancer } from './Reducers/firebase';

// const history = createBrowserHistory();

// Redux DevTools middleware
const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

// const store = createStore(connectRouter(history)(combineReducers(reducers))
const store = createStore(reducers,
  compose(
    applyMiddleware(
      // routerMiddleware(history),
      thunk,
    ),
    devTools,
    firebaseEnhancer,
    firestoreEnhancer,
  ));

export default store;

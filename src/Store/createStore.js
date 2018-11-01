import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import firebase from 'firebase/app';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createReduxWaitForMiddleware from 'redux-wait-for-action';
import { createEpicMiddleware } from 'redux-observable';
import makeRootReducer from './reducers';
import history from './history';
import rootEpic from './epics';
import { firebase as fbConfig, reduxFirebase as rrfConfig } from '../config';
import { version } from '../../package.json';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

const epicMiddleware = createEpicMiddleware();

export default (initialState = {}) => {
  const { devToolsExtension } = window;

  // ======================================================
  // Window Vars Config
  // ======================================================
  window.version = version;

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    thunk.withExtraArgument(getFirebase),
    routerMiddleware(history),
    createReduxWaitForMiddleware(),
    epicMiddleware,
    // This is where you add other middleware like redux-observable
  ];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  // Initialize Firebase
  const app = firebase.initializeApp(fbConfig);
  firebase.functions();
  firebase.auth();
  if (process.env.REACT_APP_LOCAL_FUNCTIONS) {
    app.functions().useFunctionsEmulator('http://localhost:5000');
  }
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    connectRouter(history)(makeRootReducer()),
    initialState,
    compose(
      applyMiddleware(...middleware),
      reactReduxFirebase(firebase, rrfConfig),
      reduxFirestore(firebase),
      ...enhancers,
    ),
  );
  store.asyncReducers = {};
  epicMiddleware.run(rootEpic);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = makeRootReducer;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};

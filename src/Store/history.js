import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './index';

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, store);

export default history;

import { getFirebase } from 'react-redux-firebase';
import { push } from 'connected-react-router';
import store from '../../Store';

const firebase = getFirebase();

const authorizeEventbrite = (code) => {
  firebase.functions().httpsCallable('authEventbrite')({ code })
    .then(events => console.log(events))
    .then(store.dispatch(push('/admin')))
    .catch(err => console.error(err));
};

export default authorizeEventbrite;

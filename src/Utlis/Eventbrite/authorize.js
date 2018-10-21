import { getFirebase } from 'react-redux-firebase';
import { push } from 'connected-react-router';
import store from '../../Store';
import { eventbriteVars } from '../../config';
import { getEvents, getEventsSuccess, getEvetnsFailure } from '../../Modules/Eventbrite';

const firebase = getFirebase();

const { dispatch } = store;

const openPopUp = (name = '') => {
  const { clientKey } = eventbriteVars;

  const url = `https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=${clientKey}`;

  const width = 500;
  const height = 600;
  const top = (window.screen.availHeight - height) / 2;
  const left = (window.screen.availWidth - width) / 2;
  const options = {
    width,
    height,
    top: top > 0 ? top : 0,
    left: left > 0 ? left : 0,
    location: true,
    resizable: true,
    statusbar: true,
    toolbar: false,
  };
  const optionsString = `width=${options.width},height=${options.height},top=${options.top},left=${options.left},location=${options.location},resizable=${options.resizable},statusbar=${options.statusbar},toolbar=${options.toolbar}`;

  return window.open(url, name, optionsString);
};

const handleMessage = (event) => {
  if (!event.data.code) {
    // something from an unknown domain, let's ignore it
    return;
  }
  // eslint-disable-next-line
  const code = event.data.code;
  dispatch(getEvents());
  firebase.functions().httpsCallable('authEventbrite')({ code })
    .then(events => dispatch(getEventsSuccess(events.data)))
    .then(dispatch(push('/admin')))
    .catch(err => dispatch(getEvetnsFailure(err)))
    .finally(() => window.removeEventListener('message', handleMessage));
};

const authorizeEventbrite = () => {
  window.addEventListener('message', handleMessage);
  openPopUp('Auhtorize Eventbrite');
};

export default authorizeEventbrite;

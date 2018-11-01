import { getFirebase } from 'react-redux-firebase';
import { createFlash } from '../../Modules/Flash';
import store from '../../Store';

const save = (id: string) => {
  const { dispatch } = store;
  const firebase = getFirebase();

  const saveEventbrite = firebase.functions().httpsCallable('saveEventrbite');
  const fetchTickets = firebase.functions().httpsCallable('fetchEventbriteTickets');

  return saveEventbrite(id)
    .then(() => fetchTickets())
    .then(() => dispatch(createFlash('success', 'Saved', 'Event Set Sucesfully')));
};

export default save;

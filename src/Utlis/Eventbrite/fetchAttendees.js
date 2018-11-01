import { getFirebase } from 'react-redux-firebase';

const fetchAttendees = () => {
  const firebase = getFirebase();

  const fetchTickets = firebase.functions().httpsCallable('fetchEventbriteTickets');

  return fetchTickets();
};

export default fetchAttendees;

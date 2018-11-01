import { CallableContext } from 'firebase-functions/lib/providers/https';
import { firestore } from 'firebase-admin';
import { config, https } from 'firebase-functions';
import getAll from './getAll';

const rp = require('request-promise-native');

const db = firestore();

const { HttpsError } = https;
const baseUrl = 'https://www.eventbriteapi.com/v3';

const buildRequest = async () => {
  const eventbriteSettings = (await db.doc('/settings/eventbrite')
    .get())
    .data();

  const { id, bearerToken, attendees } = eventbriteSettings;

  const method = `/events/${id}/attendees`;

  const url = `${baseUrl}${method}`;
  
  return { url, bearerToken, attendees };
};

const fetchTickets = async () => {
  try {
    const { url, bearerToken, attendees } = await (buildRequest());
    const attendeesData = await getAll(url, bearerToken, 'attendees');

    const existingAttendees = attendees;

    const newAttendees = attendeesData.filter(attendee => !existingAttendees
      .includes(attendee.id));

    const promises = [];

    for (const newAttendee of newAttendees) {
      attendees.push(newAttendee.id);
      promises.push(db.doc(`settings/eventbrite/attendees/${newAttendee.id}`)
        .set(newAttendee));
    }

    promises.push(db.doc('settings/eventbrite').update({ attendees }));

    return await Promise.all(promises);
  } catch (error) {
    console.error(error);
    throw new HttpsError('internal', 'Unknown error');
  }
};

export default fetchTickets;
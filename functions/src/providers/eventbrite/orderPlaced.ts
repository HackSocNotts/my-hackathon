import { https, Request, Response } from 'firebase-functions';
import fetchTickets from './fetchTickets';

const rp = require('request-promise-native');

const orderPlaced = async (request: Request, response: Response) => {
  try {

    await fetchTickets();

    return response.status(200).send();
  } catch (err) {
    console.error(err);
    return response.status(500).send('internal error');
  }

};

export default orderPlaced;

import { auth, firestore } from 'firebase-admin';

const db = firestore();
const collection = db.collection('logs');

const logMessage = (issuer: auth.UserRecord, target: auth.UserRecord, message: string, type: LogType): Promise<any> => {
  const logEntry: LogEntry = {
    issuer: {
      uid: issuer.uid,
      name: issuer.displayName,
      email: issuer.email,
    },
    target: {
      uid: target.uid,
      name: target.displayName,
      email: target.email,
    },
    message: message,
    type: type,
    timestamp: new Date(),
  }

  return collection.add(logEntry);
};

export enum LogType {
  ClaimAssignment = 'ClaimAssignment',
  ApplicationResponse = 'ApplicaitonResponse',
}

export interface LogEntry {
  issuer: {
    uid: string,
    name: string,
    email: string
  },
  target: {
    uid: string,
    name: string,
    email: string,
  },
  message: string,
  type: LogType,
  timestamp: Date,
};

export default logMessage;

import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { SUBMIT_APPLICATION, setApplication } from '../actions';

const submitEpic = action$ => action$.pipe(
  ofType(SUBMIT_APPLICATION),
  map((action) => {
    const application = {
      ...action.payload,
      status: 'SUBMITTED',
    };
    return setApplication(application);
  }),
);

export default submitEpic;

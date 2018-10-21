import { authState } from 'rxfire/auth';
import { getFirebase } from 'react-redux-firebase';
import { filter, flatMap, map } from 'rxjs/operators';
import store from '../../Store';
import { resetNavigationItems, addNavigationItem } from '../../Modules/Navigation';
import adminNavigationItem from './adminNavigationItem';

const auth = getFirebase().auth();
const { dispatch } = store;

const sync = () => {
  const claims$ = authState(auth).pipe(
    filter(user => !!user),
    flatMap(user => user.getIdTokenResult(true)),
    map(token => token.claims),
  );

  claims$.subscribe((claims) => {
    dispatch(resetNavigationItems());
    if (claims.admin) {
      dispatch(addNavigationItem(adminNavigationItem));
    }
  });
};

export default sync;

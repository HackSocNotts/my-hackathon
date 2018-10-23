import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { authState } from 'rxfire/auth';
import { getFirebase } from 'react-redux-firebase';
import {
  filter,
  flatMap,
  map,
  take,
} from 'rxjs/operators';
import { createFlash } from '../../Modules/Flash';

const claims$ = auth => (authState(auth).pipe(
  filter(user => !!user),
  flatMap(user => user.getIdTokenResult(true)),
  map(token => token.claims),
  take(1),
));


const requireAdmin = () => (InnerComponent) => {
  class Authenticate extends Component {
    componentWillMount() {
      const { flash } = this.props;
      const { router } = this.context;
      const { auth } = getFirebase();

      claims$(auth()).toPromise()
        .then((claims) => {
          if (!claims.admin) {
            flash('warn', 'Forbidden', 'You must be an admin to access that page');
            router.history.push('/');
          }
        }).catch(() => router.history.push('/'));
    }

    render() {
      return (
        <InnerComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    flash: PropTypes.func.isRequired,
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  // eslint-disable-next-line
  const mapStateToProps = state => ({ });

  const mapDispatchToProps = dispatch => ({
    flash: (type, title, message) => dispatch(createFlash(type, title, message)),
  });

  return compose(
    connect(mapStateToProps, mapDispatchToProps),
  )(Authenticate);
};

export default requireAdmin;

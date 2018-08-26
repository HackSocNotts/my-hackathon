import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { createFlash } from '../../Modules/Flash';
import { siteVars } from '../../config';

/**
 * Hire Order Component that redirects user if they don't meet an auth requirement
 * @param {bool} [false] verifiedEmail redirect to /account if email isn't verified
 * @param {bool} [true] showFlash show a flash message -- only optional for not logged in
 */
const requireAuth = (verifiedEmail = false, showFlash = true) => (InnerComponent) => {
  class Authenticate extends Component {
    componentWillMount() {
      const { auth, flash } = this.props;
      const { router } = this.context;
      const { hackathonName } = siteVars;

      if (isLoaded(auth) && isEmpty(auth)) {
        if (showFlash) {
          flash('info', 'You must be logged in', `You must login to use ${hackathonName}.`);
        }
        router.history.push('/login');
      } else if (isLoaded(auth) && verifiedEmail && !auth.emailVerified) {
        flash('warn', 'Email not verified', `You must verify your email before using ${hackathonName}.`);
        router.history.push('/account');
      }
    }

    componentWillUpdate(nextProps) {
      const { auth, flash } = nextProps;
      const { router } = this.context;
      const { hackathonName } = siteVars;

      if (isLoaded(auth) && isEmpty(auth)) {
        if (showFlash) {
          flash('info', 'You must be logged in', `You must login to use ${hackathonName}.`);
        }
        router.history.push('/login');
      } else if (isLoaded(auth) && verifiedEmail && !auth.emailVerified) {
        flash('warn', 'Email not verified', `You must verify your email before using ${hackathonName}.`);
        router.history.push('/account');
      }
    }

    render() {
      return (
        <InnerComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    auth: PropTypes.object,
    flash: PropTypes.func.isRequired,
  };

  Authenticate.defaultProps = {
    auth: {},
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
    firebaseConnect(),
    connect(({ firebase: { auth } }) => ({ auth })),
    connect(mapStateToProps, mapDispatchToProps),
  )(Authenticate);
};

export default requireAuth;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

const requireAuth = (InnerComponent) => {
  class Authenticate extends Component {
    componentWillMount() {
      const { auth } = this.props;
      const { router } = this.context;
      if (isLoaded(auth) && isEmpty(auth)) {
        router.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      const { auth } = nextProps;
      const { router } = this.context;
      if (isLoaded(auth) && isEmpty(auth)) {
        router.history.push('/login');
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
  };

  Authenticate.defaultProps = {
    auth: {},
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  return compose(
    firebaseConnect(),
    connect(({ firebase: { auth } }) => ({ auth })),
  )(Authenticate);
};

export default requireAuth;

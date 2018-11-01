import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const requireAuthLoaded = (NestedComponent) => {
  class RequireAuthLoaded extends Component {
    render() {
      const { isLoaded } = this.props;
      return (
        <Fragment>
          {isLoaded && <NestedComponent />}
          {!isLoaded && 'Lodaing...'}
        </Fragment>
      );
    }
  }

  RequireAuthLoaded.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
  };

  return connect(
    state => ({
      isLoaded: state.firebase.auth.isLoaded,
    }),
  )(RequireAuthLoaded);
};

export default requireAuthLoaded;

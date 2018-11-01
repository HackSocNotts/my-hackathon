import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getApplication } from '../../Modules/Application';

const requireApplication = (NestedComponent) => {
  class RequireApplication extends Component {
    constructor(props) {
      super(props);
      if (!props.application.isLoaded) {
        props.loadApplication();
      }
    }

    render() {
      const { application: { isLoaded } } = this.props;
      return (
        <Fragment>
          {isLoaded && <NestedComponent />}
          {!isLoaded && 'Lodaing...'}
        </Fragment>
      );
    }
  }

  RequireApplication.propTypes = {
    loadApplication: PropTypes.func.isRequired,
    application: PropTypes.object,
  };

  RequireApplication.defaultProps = {
    application: null,
  };

  return connect(
    state => ({
      application: state.application,
    }),
    dispatch => ({
      loadApplication: () => dispatch(getApplication()),
    }),
  )(RequireApplication);
};

export default requireApplication;

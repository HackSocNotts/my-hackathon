import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getAttendee } from '../../Modules/Eventbrite';
import requireAuthLoaded from '../requireAuthLoaded/requireAuthLoaded';

const requireAttendee = (NestedComponent) => {
  class RequireAttendee extends Component {
    constructor(props) {
      super(props);
      if (!props.eventbriteAttendee.isLoaded) {
        props.loadAttendee();
      }
    }

    render() {
      const { eventbriteAttendee: { isLoaded } } = this.props;
      return (
        <Fragment>
          {isLoaded && <NestedComponent />}
          {!isLoaded && 'Loading...'}
        </Fragment>
      );
    }
  }

  RequireAttendee.propTypes = {
    loadAttendee: PropTypes.func.isRequired,
    eventbriteAttendee: PropTypes.object.isRequired,
  };

  return compose(
    requireAuthLoaded,
    connect(
      state => ({
        eventbriteAttendee: state.eventbrite.attendee,
      }),
      dispatch => ({
        loadAttendee: () => dispatch(getAttendee()),
      }),
    ),
  )(RequireAttendee);
};

export default requireAttendee;

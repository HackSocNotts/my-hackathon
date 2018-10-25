import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import withStyles from '@material-ui/core/styles/withStyles';

import DashboardContainer from '../../Containers/Dashboard';
import EventbriteCard from './Cards/eventbrite';
import StandardCard from './Cards/standard';
import styles from './styles';
import { getAttendee } from '../../Modules/Eventbrite';

class home extends Component {
  componentDidUpdate() {
    const { auth, eventbriteAttendee, fetchAttendee } = this.props;
    if (auth.isLoaded && eventbriteAttendee === null) {
      fetchAttendee();
    }
  }

  render() {
    const { auth, eventbriteAttendee, generalSettings: { eventbrite } } = this.props;

    return (
      <DashboardContainer>
        { auth.isLoaded && !eventbrite && <StandardCard />}
        { eventbrite && <EventbriteCard />}
      </DashboardContainer>
    );
  }
}

home.contextTypes = {
  router: PropTypes.object.isRequired,
};

home.propTypes = {
  auth: PropTypes.object,
  eventbriteAttendee: PropTypes.oneOf([PropTypes.object, PropTypes.bool]),
  fetchAttendee: PropTypes.func.isRequired,
  generalSettings: PropTypes.object,
};

home.defaultProps = {
  auth: null,
  eventbriteAttendee: null,
  generalSettings: null,
};

const mapStateToProps = state => ({
  eventbriteAttendee: state.eventbrite.attendee,
  generalSettings: state.settings.general,
});

const mapDispatchToProps = dispatch => ({
  fetchAttendee: (() => dispatch(getAttendee())),
});

export default compose(
  firebaseConnect(),
  withStyles(styles),
  connect(
    ({ firebase: { auth } }) => ({
      auth,
    }),
  ),
  connect(mapStateToProps, mapDispatchToProps),
)(home);

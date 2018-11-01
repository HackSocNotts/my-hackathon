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
import requireApplication from '../../Components/requireApplication';

class home extends Component {
  render() {
    const { auth, generalSettings: { eventbrite } } = this.props;

    return (
      <React.Fragment>
        { auth.isLoaded && !eventbrite && <StandardCard />}
        { eventbrite && <EventbriteCard />}
      </React.Fragment>
    );
  }
}

home.contextTypes = {
  router: PropTypes.object.isRequired,
};

home.propTypes = {
  auth: PropTypes.object,
  generalSettings: PropTypes.object,
};

home.defaultProps = {
  auth: null,
  generalSettings: null,
};

const mapStateToProps = state => ({
  eventbriteAttendee: state.eventbrite.attendee,
  generalSettings: state.settings.general,
});

const mapDispatchToProps = dispatch => ({
  fetchAttendee: (() => dispatch(getAttendee())),
});

const Home = compose(
  requireApplication,
  firebaseConnect(),
  withStyles(styles),
  connect(
    ({ firebase: { auth } }) => ({
      auth,
    }),
  ),
  connect(mapStateToProps, mapDispatchToProps),
)(home);


const Wrapper = () => (
  <DashboardContainer>
    <Home />
  </DashboardContainer>
);

export default Wrapper;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createFlash } from '../../Modules/Flash';
import { getAttendee } from '../../Modules/Eventbrite';


const requireTicket = () => (InnerComponent) => {
  class Authenticate extends Component {
    componentWillMount() {
      const {
        auth,
        eventbrite,
        fetchAttendee,
        flash,
      } = this.props;
      const { router } = this.context;
      if (auth.isLoaded && eventbrite.attendee === null) {
        fetchAttendee();
      }

      if (eventbrite.attendee === null && eventbrite.error === 'No ticket') {
        flash('warn', 'Don\'t have a ticket', 'You need to have a ticket before providing your details');
        router.history.push('/');
      }
    }

    componentDidUpdate() {
      const {
        auth,
        eventbrite,
        fetchAttendee,
        flash,
      } = this.props;
      const { router } = this.context;
      if (auth.isLoaded && eventbrite.attendee === null) {
        fetchAttendee();
      }

      if (eventbrite.attendee === null && eventbrite.error === 'No ticket') {
        flash('warn', 'Don\'t have a ticket', 'You need to have a ticket before providing your details');
        router.history.push('/');
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
    eventbriteAttendee: PropTypes.oneOf([PropTypes.object, PropTypes.bool]),
    fetchAttendee: PropTypes.func.isRequired,
    flash: PropTypes.func.isRequired,
  };

  Authenticate.defaultProps = {
    auth: null,
    eventbriteAttendee: null,
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => ({
    eventbrite: state.eventbrite,
  });

  const mapDispatchToProps = dispatch => ({
    fetchAttendee: (() => dispatch(getAttendee())),
    flash: (type, title, message) => dispatch(createFlash(type, title, message)),
  });

  return compose(
    connect(mapStateToProps, mapDispatchToProps),
  )(Authenticate);
};

export default requireTicket;

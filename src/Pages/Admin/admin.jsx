import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { reduxForm, Field } from 'redux-form';
import DashboardContainer from '../../Containers/Dashboard';
import { authorizeEventbrite, save as saveEvent, fetchAttendees } from '../../Utlis/Eventbrite';
import EventbriteEventsDropdown from './Fields/EventbriteEventsDropdown';
import styles from './styles';
import { siteVars } from '../../config';

class admin extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save() {
    const { form } = this.props;
    const id = form.values.eventbriteEvent.value;
    saveEvent(id);
  }

  render() {
    const { events, eventbriteEvent } = this.props;

    return (
      <DashboardContainer>
        <Card>
          <CardContent>
            <Typography align="left" variant="display2" gutterBottom>
            Eventbrite
            </Typography>
            {!eventbriteEvent && (
            <Typography variant="body1" gutterBottom>
              If you use Eventbrite to release tickets but would like attendees
              to confirm their details here, please authorize eventbrite and
              select your event.
            </Typography>)}
            {eventbriteEvent && (
            <Typography variant="body1" gutterBottom>
              You&apos;ve connected&nbsp;
              <a href={eventbriteEvent.url} target="_blank" rel="noreferrer noopener">
                {eventbriteEvent.name.text}
              </a>
              &nbsp;to&nbsp;
              {siteVars.hackathonName}
              .
            </Typography>)}
            {!eventbriteEvent && !!events.length && (
              <Field
                name="eventbriteEvent"
                type="text"
                component={EventbriteEventsDropdown}
                options={events.map(event => ({
                  label: event.name.text,
                  value: event.id,
                }))}
              />
            )}
          </CardContent>
          <CardActions>
            {!eventbriteEvent && !events.length && (
            <Button onClick={authorizeEventbrite} size="small">
              Authorize Eventbrite
            </Button>
            )}
            {!eventbriteEvent && events.length && (
            <Button onClick={this.save} size="small">
              Save
            </Button>
            )}
            {eventbriteEvent && (
            <Button onClick={fetchAttendees()} size="small">
              Force Attendee Refresh
            </Button>
            )}
          </CardActions>
        </Card>
      </DashboardContainer>
    );
  }
}

admin.propTypes = {
  events: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  // classes: PropTypes.object.isRequired,
  eventbriteEvent: PropTypes.any.isRequired,
};

// eslint-disable-next-line
const mapStateToProps = state => ({
  events: state.eventbrite.events,
  form: state.form.selectEventbrite,
  eventbriteEvent: state.eventbrite.event,
});

// eslint-disable-next-line
const mapDispatchToProps = dispatch => ({ });

export default reduxForm({
  form: 'selectEventbrite',
})(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(admin)));

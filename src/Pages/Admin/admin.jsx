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
import { authorizeEventbrite } from '../../Utlis/Eventbrite';
import EventbriteEventsDropdown from './Fields/EventbriteEventsDropdown';
import styles from './styles';

class admin extends Component {
  render() {
    const { events } = this.props;

    return (
      <DashboardContainer>
        <Card>
          <CardContent>
            <Typography align="left" variant="display2" gutterBottom>
            Eventbrite
            </Typography>
            <Typography variant="body1" gutterBottom>
              If you use Eventbrite to release tickets but would like attendees
              to confirm their details here, please authorize eventbrite and
              select your event.
            </Typography>
            {!!events.length && (
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
            {!events.length && (
            <Button onClick={authorizeEventbrite} size="small">
              Authorize Eventbrite
            </Button>
            )}
            {events.length && (
            <Button onClick={console.log} size="small">
              Save
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
  // classes: PropTypes.object.isRequired,
};

// eslint-disable-next-line
const mapStateToProps = state => ({
  events: state.eventbrite.events,
});

// eslint-disable-next-line
const mapDispatchToProps = dispatch => ({ });

export default reduxForm({
  form: 'selectEventbrite',
})(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(admin)));

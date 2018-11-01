import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import styles from '../styles';
import { applicationStates, dashboardButtons, siteVars } from '../../../config';
import { getApplication } from '../../../Modules/Application';
import requireAttendee from '../../../Components/requireAttendee';

class eventbrite extends Component {
  constructor(props) {
    super(props);

    this.status = this.status.bind(this);
    this.goToApplication = this.goToApplication.bind(this);
  }

  status() {
    const { eventbriteAttendee, application } = this.props;
    if (!eventbriteAttendee.exists) {
      return 'NOTAPPLIED';
    }

    // States are NOTAPPLIED, INCOMPLETE, or SUBMITTED
    return application.status;
  }

  goToApplication() {
    const { goto } = this.props;
    goto('/application');
  }

  render() {
    const status = this.status();
    return (
      <Card>
        <CardHeader title="Application Status" />
        <CardContent>
          <Typography align="center" variant="display1">
            {applicationStates[status].name}
          </Typography>
          <Typography>
            {applicationStates[status].message}
          </Typography>
        </CardContent>
        <CardActions>
          {(status === 'INCOMPLETE') && (
            <Button size="small" color="primary" onClick={this.goToApplication}>
              {dashboardButtons.continue}
            </Button>
          )}
          {(status === 'SUBMITTED') && (
            <Button size="small" onClick={this.goToApplication}>
              {dashboardButtons.review}
            </Button>
          )}
          {(status === 'NOTAPPLIED') && (
            <Button size="small" color="primary" href={siteVars.eventbriteUrl} rel="noreferrer noopener">
              Order ticket
            </Button>
          )}
        </CardActions>
      </Card>
    );
  }
}

eventbrite.propTypes = {
  eventbriteAttendee: PropTypes.object,
  application: PropTypes.object.isRequired,
  goto: PropTypes.func.isRequired,
};

eventbrite.defaultProps = {
  eventbriteAttendee: null,
};

const mapStateToProps = state => ({
  eventbriteAttendee: state.eventbrite.attendee,
  application: state.application,
  generalSettings: state.settings.general,
});

const mapDispatchToProps = dispatch => ({
  loadApplication: () => dispatch(getApplication()),
  goto: path => dispatch(push(path)),
});

export default compose(
  requireAttendee,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(eventbrite);

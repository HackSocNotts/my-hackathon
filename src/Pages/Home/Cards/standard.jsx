import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { applicationStates, dashboardButtons } from '../../../config';

class standard extends Component {
  constructor(props) {
    super(props);
    this.goToApplication = this.goToApplication.bind(this);
    this.goToTeam = this.goToTeam.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
  }

  goToApplication() {
    const { router } = this.context;
    router.history.push('/application');
  }

  goToTeam() {
    const { router } = this.context;
    router.history.push('/team');
  }

  handleAccept() {
    const { setApplicationStatus } = this.props;
    setApplicationStatus('CONFIRMED');
  }

  handleDecline() {
    const { setApplicationStatus } = this.props;
    setApplicationStatus('DECLINED');
  }

  handleWithdraw() {
    const { setApplicationStatus } = this.props;
    setApplicationStatus('WITHDRAWEN');
  }

  render() {
    const { applicationStatus } = this.props;
    return (
      <Card>
        <CardHeader title="Application Status" />
        <CardContent>
          <Typography align="center" variant="display1">
            {applicationStates[applicationStatus].name}
          </Typography>
          <Typography>
            {applicationStates[applicationStatus].message}
          </Typography>
        </CardContent>
        {(applicationStatus !== 'DECLINED' && applicationStatus !== 'REJECTED'
          && applicationStatus !== 'WITHDRAWEN' && applicationStatus !== 'EXPIRED')
          && (
            <CardActions>
              {(applicationStatus === 'INCOMPLETE') && (
                <Button size="small" color="primary" onClick={this.goToApplication}>
                  {dashboardButtons.continue}
                </Button>
              )}
              {(applicationStatus === 'SUBMITTED') && (
                <Button size="small" onClick={this.goToApplication}>
                  {dashboardButtons.review}
                </Button>
              )}
              {(applicationStatus === 'ACCEPTED') && (
                <Button size="small" color="primary" onClick={this.handleAccept}>
                  {dashboardButtons.accept}
                </Button>
              )}
              {(applicationStatus === 'CONFIRMED') && (
                <Button size="small" onClick={this.goToTeam}>
                  {dashboardButtons.team}
                </Button>
              )}
              {(applicationStatus !== 'INCOMPLETE' && !(applicationStatus === 'ACCEPTED' || applicationStatus === 'CONFIRMED')) && (
                <Button size="small" color="secondary" onClick={this.handleWithdraw}>
                  {dashboardButtons.withdraw}
                </Button>
              )}
              {(applicationStatus === 'ACCEPTED' || applicationStatus === 'CONFIRMED') && (
                <Button size="small" color="secondary" onClick={this.handleDecline}>
                  {dashboardButtons.decline}
                </Button>
              )}
            </CardActions>
          )
        }
      </Card>
    );
  }
}

standard.contextTypes = {
  router: PropTypes.object.isRequired,
};

standard.propTypes = {
  applicationStatus: PropTypes.string,
  setApplicationStatus: PropTypes.func,
};

standard.defaultProps = {
  applicationStatus: 'INCOMPLETE',
  setApplicationStatus: null,
};

export default standard;

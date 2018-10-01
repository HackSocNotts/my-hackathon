import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import DashboardContainer from '../../Containers/Dashboard';
import { applicationStates, dashboardButtons } from '../../config';

class home extends Component {
  state = {
    applicationStatus: 'accepted',
  };

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
    this.setState({ applicationStatus: 'confirmed' });
  }

  handleDecline() {
    this.setState({ applicationStatus: 'declined' });
  }

  handleWithdraw() {
    this.setState({ applicationStatus: 'withdrawen' });
  }

  render() {
    const { applicationStatus } = this.state;
    return (
      <DashboardContainer>
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
          {(applicationStatus !== 'declined' && applicationStatus !== 'rejected'
            && applicationStatus !== 'withdrawen' && applicationStatus !== 'expired')
            && (
              <CardActions>
                {(applicationStatus === 'incomplete') && (
                  <Button size="small" color="primary" onClick={this.goToApplication}>
                    {dashboardButtons.continue}
                  </Button>
                )}
                {(applicationStatus === 'submitted') && (
                  <Button size="small" onClick={this.goToApplication}>
                    {dashboardButtons.review}
                  </Button>
                )}
                {(applicationStatus === 'accepted') && (
                  <Button size="small" color="primary" onClick={this.handleAccept}>
                    {dashboardButtons.accept}
                  </Button>
                )}
                {(applicationStatus === 'confirmed') && (
                  <Button size="small" onClick={this.goToTeam}>
                    {dashboardButtons.team}
                  </Button>
                )}
                {(applicationStatus !== 'incomplete' && !(applicationStatus === 'accepted' || applicationStatus === 'confirmed')) && (
                  <Button size="small" color="secondary" onClick={this.handleWithdraw}>
                    {dashboardButtons.withdraw}
                  </Button>
                )}
                {(applicationStatus === 'accepted' || applicationStatus === 'confirmed') && (
                  <Button size="small" color="secondary" onClick={this.handleDecline}>
                    {dashboardButtons.decline}
                  </Button>
                )}
              </CardActions>
            )
          }
        </Card>
      </DashboardContainer>
    );
  }
}

home.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default home;

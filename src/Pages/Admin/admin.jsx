import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DashboardContainer from '../../Containers/Dashboard';
import { authorizeEventbrite } from '../../Utlis/Eventbrite';

export default class admin extends Component {
  render() {
    return (
      <DashboardContainer>
        <Card>
          <CardContent>
            <Typography align="left" variant="h3" gutterBottom>
            Eventbrite
            </Typography>
            <Typography variant="body1" gutterBottom>
              If you use Eventbrite to release tickets but would like attendees
              to confirm their details here, please authorize eventbrite and
              select your event.
            </Typography>
            <Button onClick={authorizeEventbrite}>
              Authorize Eventbrite
            </Button>
          </CardContent>
        </Card>
      </DashboardContainer>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import DashboardContainer from '../../Containers/Dashboard';
import SchoolSearch from './Fields/SchoolSearch';
import GenderDropdown from './Fields/GenderDropdown';
import EthnicityDropdown from './Fields/EthnicityDropdown';
import DietaryDropdown from './Fields/DietaryDropdown';
import ShirtSizeDropdown from './Fields/ShitSizeDropdown';

import styles from './styles';

class application extends Component {
  render() {
    const { classes, profile } = this.props;

    return profile.isLoaded === true ? (
      <DashboardContainer>
        <form className={classes.container}>
          <Typography variant="title" gutterBottom>
            Personal Information
          </Typography>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              defaultValue={profile.myMlhData
                ? `${profile.myMlhData.first_name} ${profile.myMlhData.last_name}`
                : profile.displayName}
            />
            <FormHelperText>
              Your full legal name
            </FormHelperText>
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              defaultValue={profile.myMlhData
                ? profile.myMlhData.email
                : profile.email}
            />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="phone">Phone Number</InputLabel>
            <Input
              id="phone"
              defaultValue={profile.myMlhData
                ? profile.myMlhData.phone_number
                : ''}
            />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="birthdate">Birth Date</InputLabel>
            <Input
              id="birthdate"
              defaultValue={profile.myMlhData
                ? profile.myMlhData.date_of_birth
                : ''}
            />
          </FormControl>

          <Typography variant="title" gutterBottom>
            Academic Information
          </Typography>
          <FormControl className={classes.margin}>
            <SchoolSearch profile={profile} />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="major">Major</InputLabel>
            <Input
              id="major"
              placeholder="What is your major?"
              defaultValue={profile.myMlhData
                ? profile.myMlhData.major
                : ''}
            />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="level_of_study">Level of Study</InputLabel>
            <Input
              id="level_of_study"
              placeholder="What is your most current level of study?"
              defaultValue={profile.myMlhData
                ? profile.myMlhData.level_of_study
                : ''}
            />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="graduation">Graduation Year</InputLabel>
            <Input
              id="graduation"
              placeholder="What is your graduation year?"
            />
          </FormControl>

          <Typography variant="title" gutterBottom>
            Demographic Information
          </Typography>
          <FormControl className={classes.margin}>
            <GenderDropdown profile={profile} />
          </FormControl>
          <FormControl className={classes.margin}>
            <EthnicityDropdown profile={profile} />
          </FormControl>

          <Typography variant="title" gutterBottom>
            Additional Information
          </Typography>
          <FormControl className={classes.margin}>
            <DietaryDropdown profile={profile} />
          </FormControl>
          <FormControl className={classes.margin}>
            <ShirtSizeDropdown profile={profile} />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="special_needs">Special Needs</InputLabel>
            <Input
              id="special_needs"
              placeholder="Do you have any special needs?"
              defaultValue={profile.myMlhData
                ? profile.myMlhData.special_needs
                : ''}
              multiline
              rows={2}
              rowsMax={5}
            />
          </FormControl>

          <Typography variant="title" gutterBottom>
            Code of Conduct and Privacy
          </Typography>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox value="mlhCoC" />
              }
              label="I have read and agree to the MLH Code of Conduct.*"
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox value="mlhPrivac" />
              }
              label="I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails in-line with the MLH Privacy Policy. I further I agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy.*"
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox value="mlhMarketting" />
              }
              label="I want to recieve occasional messages about hackathons in-line with the MLH Privacy Policy."
            />
          </FormGroup>
        </form>
      </DashboardContainer>
    ) : (
      <DashboardContainer>
        Loading...
      </DashboardContainer>
    );
  }
}

application.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  firebase: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
};

// eslint-disable-next-line
const mapStateToProps = state => ({ });

// eslint-disable-next-line
const mapDispatchToProps = state => ({ });

export default compose(
  withFirebase,
  withStyles(styles, { withTheme: true }),
  connect(
    ({ firebase: { profile, auth } }) => ({
      profile,
      auth,
    }),
  ),
  connect(mapStateToProps, mapDispatchToProps),
)(application);

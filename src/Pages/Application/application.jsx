import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form';
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
import NameField from './Fields/Name';
import EmailField from './Fields/Email';
import PhoneField from './Fields/Phone';
import BirthdateField from './Fields/Birthdate';

import { getApplication } from '../../Modules/Application';

import styles from './styles';

class Application extends Component {
  componentWillMount() {
    const { loadApplication } = this.props;
    loadApplication();
  }

  render() {
    const { classes, application, profile } = this.props;

    const { application: fields } = application;

    return application.isLoaded === true ? (
      <DashboardContainer>
        <form className={classes.container}>
          <Typography variant="title" gutterBottom>
            Personal Information
          </Typography>
          <Field name="name" component={NameField} />
          <Field name="email" component={EmailField} />
          <Field name="phone" component={PhoneField} />
          <Field name="birthdate" component={BirthdateField} />

          <Typography variant="title" gutterBottom>
            Academic Information
          </Typography>
          <Field name="school" component={SchoolSearch} />
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
          <Field name="gender" component={GenderDropdown} />
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

Application.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  loadApplication: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
};

// eslint-disable-next-line
const mapStateToProps = state => ({
  application: state.application,
});

// eslint-disable-next-line
const mapDispatchToProps = dispatch => ({ 
  loadApplication: () => dispatch(getApplication()),
});

export default compose(
  withFirebase,
  reduxForm({
    form: 'application',
    destroyOnUnmount: false,
  }),
  withStyles(styles, { withTheme: true }),
  connect(
    ({ firebase: { profile } }) => ({
      profile,
    }),
  ),
  connect(mapStateToProps, mapDispatchToProps),
)(Application);

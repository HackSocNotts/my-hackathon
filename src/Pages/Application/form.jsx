import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as Fields from './Fields';

import store from '../../Store';
import { autosaveApplication, submitApplication } from '../../Modules/Application';
import { validate } from '../../Modules/Application/utils';

import shirtSizes from '../../Data/shirtSizes';
import schools from '../../Data/schools';
import ethnicities from '../../Data/ethnicities';
import genders from '../../Data/genders';
import dietaryRequirements from '../../Data/dietaryRequirements';

import styles from './styles';

class Application extends Component {
  render() {
    const {
      classes,
      handleSubmit,
      valid,
    } = this.props;

    return (
      <form className={classes.container} onSubmit={handleSubmit}>
        <Typography variant="title" gutterBottom>
          Personal Information
        </Typography>
        <Field
          name="name"
          label="Name"
          helpText="Your full legal name"
          component={Fields.TextField}
        />
        <Field
          name="email"
          label="Email"
          component={Fields.TextField}
        />
        <Field
          name="phone"
          label="Phone Number"
          component={Fields.TextField}
        />
        <Field
          name="birthdate"
          label="Birth Date"
          component={Fields.TextField}
          type="date"
        />

        <Typography variant="title" gutterBottom>
          Academic Information
        </Typography>
        <Field
          name="school"
          component={Fields.CreatableDropdown}
          placeholder="Search for your school"
          label="School"
          options={schools.map(school => ({ label: school, value: school }))}
        />
        <Field
          name="major"
          label="Major"
          component={Fields.TextField}
        />
        <Field
          name="levelOfStudy"
          label="Level of Study"
          component={Fields.TextField}
        />
        <Field
          name="graduation"
          label="Graduation Year"
          component={Fields.TextField}
        />

        <Typography variant="title" gutterBottom>
          Demographic Information
        </Typography>
        <Field
          name="gender"
          label="Gender"
          placeholder="Please select an option"
          options={genders.map(gender => ({ label: gender, value: gender }))}
          component={Fields.CreatableDropdown}
        />
        <Field
          name="ethnicity"
          placeholder="What is your race/ethnicity?"
          label="Race/Ethnicity"
          options={ethnicities.map(ethnicity => ({ label: ethnicity, value: ethnicity }))}
          component={Fields.CreatableDropdown}
        />

        <Typography variant="title" gutterBottom>
          Additional Information
        </Typography>
        <Field
          name="dietaryRestrictions"
          placeholder="Do you have any dietary restrictions?"
          label="Dietary Restrictions"
          options={dietaryRequirements.map(requirement => ({
            label: requirement,
            value: requirement,
          }))}
          component={Fields.CreatableDropdown}
        />
        <Field
          name="shirtSize"
          label="Shirt Size"
          placeholder="Select your shirt size."
          options={shirtSizes.map(option => ({ label: option, value: option }))}
          component={Fields.FixedOptionsDropdown}
        />
        <Field name="specialNeeds" component={Fields.SpecialNeedsField} />

        <Typography variant="title" gutterBottom>
          Code of Conduct and Privacy
        </Typography>
        <Field
          name="mlhCoC"
          label="I have read and agree to the MLH Code of Conduct.*"
          component={Fields.OptIn}
        />
        <Field
          name="mlhPrivacy"
          label="I agree to the MLH Privacy Policy.*"
          component={Fields.OptIn}
        />
        <Field
          name="mlhContest"
          label="I agree to the MLH Contest Terms and Conditions.*"
          component={Fields.OptIn}
        />
        <Field
          name="mlhSharring"
          label="I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails in-line with the MLH Privacy Policy."
          component={Fields.OptIn}
        />
        <Field
          name="mlhMarketting"
          label="I want to recieve occasional messages about hackathons in-line with the MLH Privacy Policy."
          component={Fields.OptIn}
        />

        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className={classes.button}
          disabled={!valid}
        >
          Submit
        </Button>
      </form>
    );
  }
}

Application.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
};

// eslint-disable-next-line
const mapStateToProps = state => ({
  initialValues: (state.firebase.profile.myMlhData
    && !Object.keys(state.application.application).length) ? {
      email: state.firebase.profile.myMlhData.email,
      major: state.firebase.profile.myMlhData.major,
      name: (`${state.firebase.profile.myMlhData.first_name} ${state.firebase.profile.myMlhData.last_name}`),
      phone: state.firebase.profile.myMlhData.phone_number,
      birthdate: state.firebase.profile.myMlhData.date_of_birth,
      school: {
        label: state.firebase.profile.myMlhData.school.name,
        value: state.firebase.profile.myMlhData.school.name,
      },
      gender: {
        label: state.firebase.profile.myMlhData.gender,
        value: state.firebase.profile.myMlhData.gender,
      },
      dietaryRestrictions: {
        label: state.firebase.profile.myMlhData.dietary_restrictions,
        value: state.firebase.profile.myMlhData.dietary_restrictions,
      },
      shirtSize: {
        label: state.firebase.profile.myMlhData.shirt_size,
        value: state.firebase.profile.myMlhData.shirt_size,
      },
      levelOfStudy: state.firebase.profile.myMlhData.level_of_study,
      specialNeeds: state.firebase.profile.myMlhData.special_needs,
    } : state.application.application,
});

// eslint-disable-next-line
const mapDispatchToProps = dispatch => ({
  autoSave: application => dispatch(autosaveApplication(application)),
});

export default compose(
  withFirebase,
  withStyles(styles, { withTheme: true }),
  connect(
    ({ firebase: { profile } }) => ({
      profile,
    }),
  ),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'application',
    destroyOnUnmount: false,
    validate,
    onChange: values => store.dispatch(autosaveApplication(values)),
    onSubmit: values => store.dispatch(submitApplication(values)),
  }),
)(Application);

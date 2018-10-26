import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DashboardContainer from '../../Containers/Dashboard';
import * as Fields from './Fields';

import { getApplication } from '../../Modules/Application';
import { validate } from '../../Modules/Application/utils';

import styles from './styles';

class Application extends Component {
  componentWillMount() {
    const { loadApplication } = this.props;
    loadApplication();
  }

  render() {
    const {
      classes,
      application,
      handleSubmit,
      valid,
      pristine,
    } = this.props;

    return application.isLoaded === true ? (
      <DashboardContainer>
        <form className={classes.container} onSubmit={handleSubmit}>
          <Typography variant="title" gutterBottom>
            Personal Information
          </Typography>
          <Field name="name" component={Fields.NameField} />
          <Field name="email" component={Fields.EmailField} />
          <Field name="phone" component={Fields.PhoneField} />
          <Field name="birthdate" component={Fields.BirthdateField} />

          <Typography variant="title" gutterBottom>
            Academic Information
          </Typography>
          <Field name="school" component={Fields.SchoolSearch} />
          <Field name="major" component={Fields.MajorField} />
          <Field name="levelOfStudy" component={Fields.LevelOfStudyField} />
          <Field name="graduation" component={Fields.GraduationField} />

          <Typography variant="title" gutterBottom>
            Demographic Information
          </Typography>
          <Field name="gender" component={Fields.GenderDropdown} />
          <Field name="ethnicity" component={Fields.EthnicityDropdown} />

          <Typography variant="title" gutterBottom>
            Additional Information
          </Typography>
          <Field name="dietaryRestrictions" component={Fields.DietaryDropdown} />
          <Field name="shirtSize" component={Fields.ShirtSizeDropdown} />
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
            disabled={!valid || pristine}
          >
            Submit
          </Button>
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
  classes: PropTypes.object.isRequired,
  loadApplication: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
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
    validate,
    onSubmit: values => console.log('submitting', values),
  }),
  withStyles(styles, { withTheme: true }),
  connect(
    ({ firebase: { profile } }) => ({
      profile,
    }),
  ),
  connect(mapStateToProps, mapDispatchToProps),
)(Application);

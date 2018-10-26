import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import DashboardContainer from '../../Containers/Dashboard';
import * as Fields from './Fields';

import { getApplication } from '../../Modules/Application';

import styles from './styles';

class Application extends Component {
  componentWillMount() {
    const { loadApplication } = this.props;
    loadApplication();
  }

  render() {
    const { classes, application } = this.props;

    return application.isLoaded === true ? (
      <DashboardContainer>
        <form className={classes.container}>
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
          <Field name="mlhCoC" component={Fields.MlhCodeOfConductCheckbox} />
          <Field name="mlhPrivacy" component={Fields.MlhPrivacyPolicyCheckbox} />
          <Field name="mlhMarketting" component={Fields.MlhMarkettingCheckbox} />
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
  // profile: PropTypes.object.isRequired,
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

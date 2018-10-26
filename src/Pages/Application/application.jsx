import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
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
import LevelOfStudyField from './Fields/LevelOfStudy';
import MajorField from './Fields/Major';
import GraduationField from './Fields/Graduation';
import SpecialNeedsField from './Fields/SpecialNeeds';
import MlhCodeOfConductCheckbox from './Fields/MlhCodeOfConduct';
import MlhPrivacyPolicyCheckbox from './Fields/MlhPrivacyPolicy';
import MlHMarkettingCheckbox from './Fields/MlhMarketting';

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
          <Field name="name" component={NameField} />
          <Field name="email" component={EmailField} />
          <Field name="phone" component={PhoneField} />
          <Field name="birthdate" component={BirthdateField} />

          <Typography variant="title" gutterBottom>
            Academic Information
          </Typography>
          <Field name="school" component={SchoolSearch} />
          <Field name="major" component={MajorField} />
          <Field name="levelOfStudy" component={LevelOfStudyField} />
          <Field name="graduation" component={GraduationField} />

          <Typography variant="title" gutterBottom>
            Demographic Information
          </Typography>
          <Field name="gender" component={GenderDropdown} />
          <Field name="ethnicity" component={EthnicityDropdown} />

          <Typography variant="title" gutterBottom>
            Additional Information
          </Typography>
          <Field name="dietaryRestrictions" component={DietaryDropdown} />
          <Field name="shirtSize" component={ShirtSizeDropdown} />
          <Field name="specialNeeds" component={SpecialNeedsField} />

          <Typography variant="title" gutterBottom>
            Code of Conduct and Privacy
          </Typography>
          <Field name="mlhCoC" component={MlhCodeOfConductCheckbox} />
          <Field name="mlhPrivacy" component={MlhPrivacyPolicyCheckbox} />
          <Field name="mlhMarketting" component={MlHMarkettingCheckbox} />
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

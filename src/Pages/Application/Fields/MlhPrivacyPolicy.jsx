import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import styles from '../styles';

class MlhPrivacyPolicy extends Component {
  render() {
    const { input } = this.props;
    return (
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox value="mlhPrivacy" {...input} />
          }
          label="I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails in-line with the MLH Privacy Policy. I further I agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy.*"
        />
      </FormGroup>
    );
  }
}

MlhPrivacyPolicy.propTypes = {
  input: PropTypes.any.isRequired,
};

export default compose(
  withStyles(styles, { withTheme: true }),
)(MlhPrivacyPolicy);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import styles from '../styles';

class MlhMarketting extends Component {
  render() {
    const { input } = this.props;
    return (
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox value="mlhMarketting" {...input} />
          }
          label="I want to recieve occasional messages about hackathons in-line with the MLH Privacy Policy."
        />
      </FormGroup>
    );
  }
}

MlhMarketting.propTypes = {
  input: PropTypes.any.isRequired,
};

export default compose(
  withStyles(styles, { withTheme: true }),
)(MlhMarketting);

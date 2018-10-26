import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import styles from '../styles';

class MlhCodeOfConduct extends Component {
  render() {
    const { input } = this.props;
    return (
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox value="mlhCoC" {...input} />
          }
          label="I have read and agree to the MLH Code of Conduct.*"
        />
      </FormGroup>
    );
  }
}

MlhCodeOfConduct.propTypes = {
  input: PropTypes.any.isRequired,
};

export default compose(
  withStyles(styles, { withTheme: true }),
)(MlhCodeOfConduct);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';

import styles from '../styles';

class OptIn extends Component {
  render() {
    const {
      input,
      meta: { error, touched },
      name,
      label,
    } = this.props;
    return (
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox value={name} {...input} />
          }
          label={label}
        />
        {!!error && touched && (
          <FormHelperText error>
            {error}
          </FormHelperText>
        )}
      </FormGroup>
    );
  }
}

OptIn.propTypes = {
  input: PropTypes.any.isRequired,
  meta: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles, { withTheme: true }),
)(OptIn);

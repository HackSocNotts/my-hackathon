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
      input: { name, value, ...inputProps },
      meta: { error, touched },
      label,
      disabled,
    } = this.props;
    return (
      <FormGroup row>
        <FormControlLabel
          control={(
            <Checkbox
              name={name}
              value={name}
              checked={!!value}
              {...inputProps}
              disabled={disabled}
            />
          )}
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
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

OptIn.defaultProps = {
  disabled: false,
};

export default compose(
  withStyles(styles, { withTheme: true }),
)(OptIn);

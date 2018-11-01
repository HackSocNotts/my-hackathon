import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import styles from '../styles';

class Text extends Component {
  render() {
    const {
      classes,
      input,
      input: { name },
      meta: { error, touched },
      label,
      helpText,
      type,
      disabled,
    } = this.props;
    return (
      <FormControl className={classes.margin}>
        <InputLabel htmlFor={name}>
          {label}
        </InputLabel>
        <Input
          name={name}
          id={name}
          {...input}
          error={!!error && touched}
          type={type}
          disabled={disabled}
        />
        {!!helpText && (
        <FormHelperText>
          {helpText}
        </FormHelperText>)}
        {!!error && touched && (
          <FormHelperText error>
            {error}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}

Text.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.any.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

Text.defaultProps = {
  helpText: null,
  type: 'text',
  disabled: false,
};

export default compose(
  withStyles(styles, { withTheme: true }),
)(Text);

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
      input, meta: { error, touched },
      name,
      label,
      helpText,
    } = this.props;
    return (
      <FormControl className={classes.margin}>
        <InputLabel htmlFor={name}>
          {label}
        </InputLabel>
        <Input
          id={name}
          {...input}
          error={!!error && touched}
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
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
};

Text.defaultProps = {
  helpText: null,
};

export default compose(
  withStyles(styles, { withTheme: true }),
)(Text);

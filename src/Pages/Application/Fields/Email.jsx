import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import styles from '../styles';

class Email extends Component {
  render() {
    const { classes, input } = this.props;
    return (
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" {...input} />
      </FormControl>
    );
  }
}

Email.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.any.isRequired,
};

export default compose(
  withStyles(styles, { withTheme: true }),
)(Email);

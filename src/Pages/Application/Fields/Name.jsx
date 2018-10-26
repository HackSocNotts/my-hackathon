import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import styles from '../styles';

class Name extends Component {
  render() {
    const { classes, input } = this.props;
    return (
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          id="name"
          {...input}
        />
        <FormHelperText>
          Your full legal name
        </FormHelperText>
      </FormControl>
    );
  }
}

Name.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.any.isRequired,
};

export default compose(
  withStyles(styles, { withTheme: true }),
)(Name);

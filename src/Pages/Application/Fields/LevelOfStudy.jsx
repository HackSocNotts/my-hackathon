import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import styles from '../styles';

class LevelOfStudy extends Component {
  render() {
    const { classes, input } = this.props;
    return (
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="level_of_study">Level of Study</InputLabel>
        <Input
          id="level_of_study"
          placeholder="What is your most current level of study?"
          {...input}
        />
      </FormControl>
    );
  }
}

LevelOfStudy.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.any.isRequired,
};

export default compose(
  withStyles(styles, { withTheme: true }),
)(LevelOfStudy);

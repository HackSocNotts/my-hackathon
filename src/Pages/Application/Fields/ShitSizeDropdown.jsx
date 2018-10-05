import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import Select from 'react-select';

/* eslint-disable react/destructuring-assignment */

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

const NoOptionsMessage = props => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.noOptionsMessage}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />;

const Control = props => (
  <TextField
    fullWidth
    InputProps={{
      inputComponent,
      inputProps: {
        className: props.selectProps.classes.input,
        inputRef: props.innerRef,
        children: props.children,
        ...props.innerProps,
      },
    }}
    {...props.selectProps.textFieldProps}
  />
);

const Option = props => (
  <MenuItem
    buttonRef={props.innerRef}
    selected={props.isFocused}
    component="div"
    style={{
      fontWeight: props.isSelected ? 500 : 400,
    }}
    {...props.innerProps}
  >
    {props.children}
  </MenuItem>
);

const Placeholder = props => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.placeholder}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

const SingleValue = props => (
  <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
    {props.children}
  </Typography>
);

const ValueContainer = props => <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;

const Menu = props => (
  <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
    {props.children}
  </Paper>
);

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class ShirtSizeDropdown extends Component {
  render() {
    const { profile, classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    const options = [
      'Women\'s XXS',
      'Women\'s XS',
      'Women\'s S',
      'Women\'s M',
      'Women\'s L',
      'Women\'s XL',
      'Women\'s XXL',
      'Unisex\'s XXS',
      'Unisex\'s XS',
      'Unisex\'s S',
      'Unisex\'s M',
      'Unisex\'s L',
      'Unisex\'s XL',
      'Unisex\'s XXL',
    ];


    return (
      <React.Fragment>
        <Select
          id="school"
          isClearable
          displayEmpty
          classes={classes}
          styles={selectStyles}
          defaultValue={profile.myMlhData
            ? { label: profile.myMlhData.shirt_size, value: profile.myMlhData.shirt_size }
            : {}}
          options={options.map(option => ({ label: option, value: option }))}
          components={components}
          placeholder="Select your shirt size."
          textFieldProps={{
            label: 'Shirt Size',
            InputLabelProps: {
              shrink: true,
            },
          }}
        />
      </React.Fragment>
    );
  }
}

ShirtSizeDropdown.propTypes = {
  profile: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ShirtSizeDropdown);

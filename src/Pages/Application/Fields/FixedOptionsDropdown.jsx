import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import AsyncSelect from 'react-select/lib/Async';

/* eslint-disable react/destructuring-assignment */

const loadOptions = options => input => new Promise((resolve) => {
  const newOptions = options.filter(option => option.value.includes(input))
    .slice(0, 100);
  return resolve(newOptions);
});

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
  margin: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
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

const ValueContainer = props => (
  <div
    className={props.selectProps.classes.valueContainer}
  >
    {props.children}
  </div>);

ValueContainer.propTypes = {
  children: PropTypes.node.isRequired,
  selectProps: PropTypes.any.isRequired,
};

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

class FixedOptionsDropdown extends Component {
  render() {
    const {
      input: { value, onChange, name },
      meta: { error, touched },
      classes,
      theme,
      options,
      placeholder,
      label,
      helpText,
    } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <FormControl className={classes.margin}>
        <AsyncSelect
          id={name}
          isClearable
          displayEmpty
          classes={classes}
          styles={selectStyles}
          defaultOptions={options.length > 100 ? [
            {
              value: null,
              label: 'Start typing...',
            },
          ] : options}
          loadOptions={loadOptions(options)}
          components={components}
          placeholder={placeholder}
          textFieldProps={{
            label,
            InputLabelProps: {
              shrink: true,
            },
          }}
          value={value}
          onChange={onChange}
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

FixedOptionsDropdown.propTypes = {
  input: PropTypes.any.isRequired,
  meta: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    valye: PropTypes.string,
  })).isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
};

FixedOptionsDropdown.defaultProps = {
  helpText: null,
};

export default withStyles(styles, { withTheme: true })(FixedOptionsDropdown);

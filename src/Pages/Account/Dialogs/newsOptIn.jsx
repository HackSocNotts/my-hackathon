import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { siteVars } from '../../../config';

class newsOptIn extends Component {
  state = {
    open: false,
    emailError: false,
    confirmEmail: '',
  };

  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEmailValidationChange = this.handleEmailValidationChange.bind(this);
  }

  handleChange = (event) => {
    const { submitFunction } = this.props;
    const { checked } = event.target;

    this.setState({ indeterminate: true });

    if (!checked) {
      submitFunction(false);
      this.setState({ indeterminate: false });
    } else {
      this.open();
    }
  };

  handleEmailValidationChange = event => this.setState({ confirmEmail: event.target.value });

  open = () => this.setState({ open: true });

  handleClose = action => () => {
    const { submitFunction, email } = this.props;
    const { confirmEmail } = this.state;

    if (action === 'save') {
      if (confirmEmail !== email) {
        this.setState({ emailError: true });
        return false;
      }
      this.setState({ open: false });
      this.setState({ emailError: false });
      submitFunction(true);
      this.setState({ indeterminate: false });
    } else {
      this.setState({ open: false });
      this.setState({ emailError: false });
      this.setState({ indeterminate: false });
    }

    return true;
  }

  render() {
    const { subscribed } = this.props;
    const { emailError, open, indeterminate } = this.state;
    return (
      <React.Fragment>
        <FormControlLabel
          control={(
            <Checkbox
              checked={subscribed}
              onChange={this.handleChange}
              indeterminate={indeterminate}
              color="primary"
            />
          )}
          label={`Subscribed to the ${siteVars.hackathonName} newsletter`}
        />
        <Dialog
          open={open}
          onClose={this.handleClose('close')}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe to Newsletter</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to newsletter updates please confirm your email address.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              error={emailError}
              helperText={emailError ? 'The email does not match your registered email.' : ''}
              onChange={this.handleEmailValidationChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose('cancel')} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose('save')} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

newsOptIn.propTypes = {
  subscribed: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  submitFunction: PropTypes.func.isRequired,
};

export default newsOptIn;

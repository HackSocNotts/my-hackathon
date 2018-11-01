import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class changeEmail extends Component {
  state = {
    email: '',
    open: false,
  };

  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange = event => this.setState({ email: event.target.value });

  open = () => this.setState({ open: true });

  handleClose = action => () => {
    const { submitFunction } = this.props;
    const { email } = this.state;

    this.setState({ open: false });

    if (action === 'save') {
      submitFunction(email);
    }
  }

  render() {
    const { buttonProps } = this.props;
    const { email, open } = this.state;
    return (
      <React.Fragment>
        <Button type="button" onClick={this.open} {...buttonProps}>
          Change Email
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose('close')}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Change Email</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please specify the new email address you&apos;d like to use.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              defaultValue={email}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose('cancel')} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose('save')} color="primary">
              Change
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

changeEmail.propTypes = {
  buttonProps: PropTypes.object,
  submitFunction: PropTypes.func.isRequired,
};

changeEmail.defaultProps = {
  buttonProps: {},
};

export default changeEmail;

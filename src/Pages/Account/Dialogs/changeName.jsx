import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class changeName extends Component {
  state = {
    name: '',
    open: false,
  };

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.open = this.open.bind(this);
  }

  handleChange = event => this.setState({ name: event.target.value });

  open = () => this.setState({ open: true });

  handleClose = action => () => {
    const { submitFunction } = this.props;
    const { name } = this.state;

    this.setState({ open: false });

    if (action === 'save') {
      submitFunction(name);
    }
  }

  render() {
    const { buttonProps } = this.props;
    const { name, open } = this.state;
    return (
      <React.Fragment>
        <Button type="button" onClick={this.open} {...buttonProps}>
          Change Name
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose('close')}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Change Name</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please specify the new name you&apos;d like to use.
              <br />
              Note that changing your name may void your applicaiton.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              defaultValue={name}
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

changeName.propTypes = {
  buttonProps: PropTypes.object,
  submitFunction: PropTypes.func.isRequired,
};

changeName.defaultProps = {
  buttonProps: {},
};

export default changeName;

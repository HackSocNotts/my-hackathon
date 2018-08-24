import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AccountIcon from '@material-ui/icons/AccountCircle';
import styles from './styles';

class userMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleToggle() {
    this.setState(state => ({ open: !state.open }));
  }

  handleClose(event) {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  }

  logout() {
    const { firebase } = this.props;
    firebase.logout();
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <React.Fragment>
        <IconButton
          color="inherit"
          buttonRef={(node) => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'menu-list-grow' : null}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <AccountIcon />
        </IconButton>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.logout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    );
  }
}

userMenu.propTypes = {
  firebase: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
};

export default firebaseConnect()(withStyles(styles, { withTheme: true })(userMenu));

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuList from '@material-ui/core/MenuList';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import NotificationsIcon from '@material-ui/icons/Notifications';
import styles from './styles';

const notifications = [
  {
    id: 1,
    title: 'Notification 1 Title',
    text: 'Notification 1 Text',
  },
  {
    id: 2,
    title: 'Notification 2 Title',
    text: 'Notification 2 Text',
  },
  {
    id: 3,
    title: 'Notification 3 Title',
    text: 'Notification 3 Text',
  },
  {
    id: 4,
    title: 'Notification 4 Title',
    text: 'Notification 4 Text',
  },
];

class notificationsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
          <Badge badgeContent={notifications.length} color="secondary">
            <NotificationsIcon />
          </Badge>
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
                  <MenuList className={classes.notification}>
                    {notifications.map(notification => (
                      <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label={notification.title}
                        key={notification.id}
                        onClick={this.handleClose}
                      >
                        <ListItemText
                          primary={notification.title}
                          secondary={notification.text}
                        />
                      </ListItem>
                    ))}
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

notificationsMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(notificationsMenu);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ApplicationIcon from '@material-ui/icons/InsertDriveFile';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import { connect } from 'react-redux';
import { BrowserView } from 'react-device-detect';
import NotificationsMenu from '../../Components/notificationsMenu';
import UserMenu from '../../Components/userMenu';
import logo from '../../logo.svg';
import styles from './styles';
import { siteVars } from '../../config';
import { openNavigationDrawer, closeNavigationDrawer } from '../../Modules/Navigation';
import Flash from '../../Components/Flash';

class dashboardContainer extends Component {
  render() {
    const {
      classes,
      children,
      open,
      handleDrawerClose,
      handleDrawerOpen,
      isLoading,
    } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar disableGutters={open} className={classes.toolbar}>
              <BrowserView>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    open && classes.menuButtonHidden,
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={handleDrawerClose}
                  className={classNames(
                    classes.menuButton,
                    !open && classes.menuButtonHidden,
                  )}
                >
                  <ChevronLeftIcon />
                </IconButton>
              </BrowserView>
              <Typography variant="title" color="inherit" noWrap className={classes.title}>
                Dashboard
              </Typography>
              <NotificationsMenu />
              <UserMenu />
            </Toolbar>
            { isLoading ? <LinearProgress color="secondary" /> : <React.Fragment /> }
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon} />
            <Divider />
            <div className={classNames(!open && classes.menuButtonHidden)}>
              <img src={logo} className={classes.logo} alt="logo" />
              <Typography
                variant="title"
                align="center"
                color="primary"
                gutterBottom
              >
                {siteVars.hackathonName}
              </Typography>
            </div>
            <List>
              <ListItem component={NavLink} exact to="/" activeClassName={classes.activeListItem}>
                <ListItemIcon>
                  <DashboardIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem component={NavLink} to="/application" activeClassName={classes.activeListItem}>
                <ListItemIcon>
                  <ApplicationIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Application" />
              </ListItem>
              <ListItem component={NavLink} to="/team" activeClassName={classes.activeListItem}>
                <ListItemIcon>
                  <PeopleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Team" />
              </ListItem>
              <ListItem component={NavLink} to="/admin" activeClassName={classes.activeListItem}>
                <ListItemIcon>
                  <SettingsIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Admin" />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Flash cardProps={{ elevation: 0, style: { marginTop: 24 } }}>
              <div className={classes.appBarSpacer} />
            </Flash>
            {isLoading ? <React.Fragment /> : children}
          </main>
        </div>
      </React.Fragment>
    );
  }
}

dashboardContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

dashboardContainer.defaultProps = {
  isLoading: false,
};

const mapStateToProps = state => ({
  open: state.navigation.drawer.open,
});

const mapDispatchToProps = dispatch => ({
  handleDrawerOpen: () => dispatch(openNavigationDrawer()),
  handleDrawerClose: () => dispatch(closeNavigationDrawer()),
});


export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(dashboardContainer),
);

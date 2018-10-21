import React from 'react';
import { isMobile } from 'react-device-detect';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ApplicationIcon from '@material-ui/icons/InsertDriveFile';

const navigationInitialState = {
  drawer: {
    open: true,
  },
  items: [
    {
      to: '/',
      icon: (<DashboardIcon color="primary" />),
      text: 'Dashboard',
    },
    {
      to: '/application',
      icon: (<ApplicationIcon color="primary" />),
      text: 'Application',
    },
  ],
};

if (isMobile) {
  navigationInitialState.drawer.open = false;
}

export default navigationInitialState;

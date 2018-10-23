import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { navigationPages } from '../../config';

const adminNavigationItem = {
  to: '/admin',
  icon: (<SettingsIcon color="primary" />),
  text: navigationPages.admin,
};

export default adminNavigationItem;

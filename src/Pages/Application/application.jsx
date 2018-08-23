import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import DashboardContainer from '../../Containers/Dashboard';

import styles from './styles';

class application extends Component {
  render() {
    return (
      <DashboardContainer>
        Application works
      </DashboardContainer>
    );
  }
}

application.proptTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(application);

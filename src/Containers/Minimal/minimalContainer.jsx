import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Flash from '../../Components/Flash';
import styles from './styles';

class minimalContainer extends Component {
  render() {
    const { children, classes } = this.props;

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            {children}
            <Flash cardProps={{ elevation: 0, style: { marginTop: 24 } }} />
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

minimalContainer.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(minimalContainer);

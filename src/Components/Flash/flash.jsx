import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import * as styles from './styles';
import { clearFlash } from '../../Modules/Flash';

class flash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      title: '',
      message: '',
      type: 'info',
    };
    this.handleClose = this.handleClose.bind(this);
  }

  static getDerivedStateFromProps(props) {
    const {
      active,
      title,
      message,
      type,
      clear,
    } = props;

    if (active) {
      clear();
      return {
        active,
        title,
        message,
        type,
      };
    }
    return null;
  }

  handleClose() {
    this.setState({
      active: false,
    });
  }

  render() {
    const {
      active,
      title,
      message,
      type,
    } = this.state;

    const { classes } = this.props;

    let cardClass;

    switch (type) {
      case 'info':
        cardClass = classes.infoInverted;
        break;

      case 'success':
        cardClass = classes.successInverted;
        break;

      case 'warn':
        cardClass = classes.warnInverted;
        break;

      case 'danger':
        cardClass = classes.dangerInverted;
        break;

      default:
        break;
    }

    if (active) {
      return (
        <Card className={cardClass}>
          <CardHeader
            action={(
              <IconButton onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            )}
            title={title}
          />
          <CardContent>
            {message}
          </CardContent>
        </Card>
      );
    }
    return (
      <React.Fragment />
    );
  }
}

flash.propTypes = {
  classes: PropTypes.object.isRequired,
  /* eslint-disable react/no-unused-prop-types */
  clear: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'warn', 'danger', '']).isRequired,
  /* eslint-enable */
};

const mapStateToProps = (state) => {
  const {
    active,
    title,
    message,
    type,
  } = state.flash;

  return ({
    active,
    title,
    message,
    type,
  });
};

const mapDispatchToProps = dispatch => ({
  clear: () => dispatch(clearFlash()),
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(flash),
);

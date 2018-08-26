import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';

import styles from './styles';
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

    if (active && title) {
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

    const { classes, cardProps } = this.props;

    let cardClass;
    let iconClass;

    switch (type) {
      case 'info':
        cardClass = classes.infoInverted;
        iconClass = classes.infoInvertedIcon;
        break;

      case 'success':
        cardClass = classes.successInverted;
        iconClass = classes.successInvertedIcon;
        break;

      case 'warn':
        cardClass = classes.warnInverted;
        iconClass = classes.warnInvertedIcon;
        break;

      case 'danger':
        cardClass = classes.dangerInverted;
        iconClass = classes.dangerInvertedIcon;
        break;

      default:
        cardClass = classes.infoInverted;
        iconClass = classes.infoInvertedIcon;
        break;
    }

    if (active) {
      return (
        <Card classes={{ root: classNames(cardClass, classes.card) }} {...cardProps}>
          <CardHeader
            classes={{ title: cardClass }}
            action={(
              <IconButton onClick={this.handleClose}>
                <CloseIcon classes={{ root: iconClass }} />
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

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(flash),
);

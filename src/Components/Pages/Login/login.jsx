import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import MinimalContainer from '../../../Containers/Minimal';
import { siteVars } from '../../../config';
import styles from './styles';
import logo from '../../../logo.svg';

class login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.loginWithGitHub = this.loginWithGitHub.bind(this);
    this.loginWithTwitter = this.loginWithTwitter.bind(this);
  }

  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }

  login(provider) {
    const { firebase } = this.props;
    firebase.login({
      provider,
      type: 'popup',
    })
      .then(() => console.log(provider))
      .catch(err => console.error(err));
  }

  loginWithGoogle() {
    this.login('google');
  }

  loginWithFacebook() {
    this.login('facebook');
  }

  loginWithTwitter() {
    this.login('twitter');
  }

  loginWithGitHub() {
    this.login('github');
  }

  render() {
    const { classes } = this.props;

    return (
      <MinimalContainer>
        <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="headline" gutterBottom>
          Welcome to&nbsp;
          {siteVars.hackathonName}
        </Typography>
        <Typography variant="subheading">
          Select a platform to Login With to begin.
        </Typography>
        <Button
          fullWidth
          variant="raised"
          color="primary"
          className={[classes.submit, classes.github].join(' ')}
          onClick={this.loginWithGitHub}
        >
          <Icon className="fab fa-github" />
        </Button>
        <Button
          fullWidth
          variant="raised"
          color="primary"
          className={[classes.submit, classes.twitter].join(' ')}
          onClick={this.loginWithTwitter}
        >
          <Icon className="fab fa-twitter" />
        </Button>
        <Button
          fullWidth
          variant="raised"
          color="primary"
          className={[classes.submit, classes.google].join(' ')}
          onClick={this.loginWithGoogle}
        >
          <Icon className="fab fa-google" />
        </Button>
        <Button
          fullWidth
          variant="raised"
          color="primary"
          className={[classes.submit, classes.facebook].join(' ')}
          onClick={this.loginWithFacebook}
        >
          <Icon className="fab fa-facebook" />
        </Button>
      </MinimalContainer>
    );
  }
}

login.propTypes = {
  firebase: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
};

export default firebaseConnect()(withStyles(styles)(login));

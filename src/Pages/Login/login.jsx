import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import MinimalContainer from '../../Containers/Minimal';
import { siteVars } from '../../config';
import styles from './styles';
import logo from '../../logo.svg';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: {
        google: false,
        github: false,
        facebook: false,
        twitter: false,
      },
    };

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
    const { router } = this.context;
    return firebase.login({
      provider,
      type: 'popup',
    })
      .then(() => router.history.push('/'));
  }

  loginWithGoogle() {
    this.setState({ loading: { google: true } });
    this.login('google')
      .catch(() => this.setState({ loading: { google: false } }));
  }

  loginWithFacebook() {
    this.setState({ loading: { facebook: true } });
    this.login('facebook')
      .catch(() => this.setState({ loading: { facebook: false } }));
  }

  loginWithTwitter() {
    this.setState({ loading: { twitter: true } });
    this.login('twitter')
      .catch(() => this.setState({ loading: { twitter: false } }));
  }

  loginWithGitHub() {
    this.setState({ loading: { github: true } });
    this.login('github')
      .catch(() => this.setState({ loading: { github: false } }));
  }

  render() {
    const { classes } = this.props;
    const { loading } = this.state;

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
        <div className={classes.wrapper}>
          <Button
            fullWidth
            variant="raised"
            color="primary"
            className={[classes.submit, classes.github].join(' ')}
            onClick={this.loginWithGitHub}
            disabled={loading.github}
          >
            <Icon className="fab fa-github" />
          </Button>
          {loading.github && <CircularProgress size={24} thickness={8} className={[classes.buttonProgress, classes.githubProgress].join(' ')} />}
        </div>
        <div className={classes.wrapper}>
          <Button
            fullWidth
            variant="raised"
            color="primary"
            className={[classes.submit, classes.twitter].join(' ')}
            onClick={this.loginWithTwitter}
            disabled={loading.twitter}
          >
            <Icon className="fab fa-twitter" />
          </Button>
          {loading.twitter && <CircularProgress size={24} thickness={8} className={[classes.buttonProgress, classes.twitterProgress].join(' ')} />}
        </div>
        <div className={classes.wrapper}>
          <Button
            fullWidth
            variant="raised"
            color="primary"
            className={[classes.submit, classes.google].join(' ')}
            onClick={this.loginWithGoogle}
            disabled={loading.google}
          >
            <Icon className="fab fa-google" />
          </Button>
          {loading.google && <CircularProgress size={24} thickness={8} className={[classes.buttonProgress, classes.googleProgress].join(' ')} />}
        </div>
        <div className={classes.wrapper}>
          <Button
            fullWidth
            variant="raised"
            color="primary"
            className={[classes.submit, classes.facebook].join(' ')}
            onClick={this.loginWithFacebook}
            disabled={loading.facebook}
          >
            <Icon className="fab fa-facebook" />
          </Button>
          {loading.facebook && <CircularProgress size={24} thickness={8} className={[classes.buttonProgress, classes.facebookProgress].join(' ')} />}
        </div>
      </MinimalContainer>
    );
  }
}

login.propTypes = {
  firebase: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
};

login.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default firebaseConnect()(withStyles(styles)(login));

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import MinimalContainer from '../../Containers/Minimal';
import { createAndShowFlash } from '../../Modules/Flash';
import { siteVars } from '../../config';
import styles from './styles';
import logo from '../../logo.svg';
import MlhIcon from '../../Components/MlhIcon';
import { login as MyMlhLogin } from '../../Utlis/MyMlhLogin';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: {
        google: false,
        github: false,
        facebook: false,
        twitter: false,
        mlh: false,
      },
    };

    this.login = this.login.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.loginWithGitHub = this.loginWithGitHub.bind(this);
    this.loginWithTwitter = this.loginWithTwitter.bind(this);
    this.loginWithMyMLH = this.loginWithMyMLH.bind(this);
    this.showLoginError = this.showLoginError.bind(this);
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
      .catch((err) => {
        this.setState({ loading: { google: false } });
        this.showLoginError(err.message);
      });
  }

  loginWithFacebook() {
    this.setState({ loading: { facebook: true } });
    this.login('facebook')
      .catch((err) => {
        this.setState({ loading: { facebook: false } });
        this.showLoginError(err.message);
      });
  }

  loginWithTwitter() {
    this.setState({ loading: { twitter: true } });
    this.login('twitter')
      .catch((err) => {
        this.setState({ loading: { twitter: false } });
        this.showLoginError(err.message);
      });
  }

  loginWithGitHub() {
    this.setState({ loading: { github: true } });
    this.login('github')
      .catch((err) => {
        this.setState({ loading: { github: false } });
        this.showLoginError(err.message);
      });
  }

  loginWithMyMLH() {
    MyMlhLogin();
    this.showLoginError('myMLH Not Configured');
  }

  showLoginError(message) {
    const { flash } = this.props;
    flash('danger', 'Login Error Occured', message);
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
            className={[classes.submit, classes.mlh].join(' ')}
            onClick={this.loginWithMyMLH}
            disabled={loading.mlh}
          >
            <MlhIcon nativeColor="#333333" />
          </Button>
          {loading.mlh && <CircularProgress size={24} thickness={8} className={[classes.buttonProgress, classes.mlhProgress].join(' ')} />}
        </div>
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
  flash: PropTypes.func.isRequired,
};

login.contextTypes = {
  router: PropTypes.object.isRequired,
};

// eslint-disable-next-line
const mapStateToProps = state => ({ });

const mapDispatchToProps = dispatch => ({
  flash: (type, title, message) => dispatch(createAndShowFlash(type, title, message)),
});

export default firebaseConnect()(withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(login),
));

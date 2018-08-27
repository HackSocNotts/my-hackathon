import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import DashboardContainer from '../../Containers/Dashboard';
import { createAndShowFlash } from '../../Modules/Flash';
import { ChangeEmail } from './Dialogs';

import styles from './styles';

class account extends Component {
  state = {
    showVerificationButton: true,
    changeEmailOpen: false,
  };

  constructor(props) {
    super(props);
    this.resendEmailVerification = this.resendEmailVerification.bind(this);
    this.handleChangeEmailButton = this.handleChangeEmailButton.bind(this);
    this.handleChangeEmailSubmit = this.handleChangeEmailSubmit.bind(this);
    this.reauth = this.reauth.bind(this);
  }

  resendEmailVerification() {
    const { auth, firebase, flash } = this.props;
    if (!auth.emailVerified) {
      firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
          this.setState({ showVerificationButton: false });
          flash('info', 'Email Verification Sent', 'Check your email for the verification link.');
        })
        .catch((err) => {
          this.setState({ showVerificationButton: false });
          flash('danger', 'Email Verification Failed to Send', (
            <p>
              Share the following error output with an administrator:
              <br />
              {err.message}
            </p>
          ));
        });
    }
  }

  handleChangeEmailButton() {
    this.setState({ changeEmailOpen: true });
  }

  /**
   * Changes the users email after submitting the changeEmail dialogue
   * @param {string} email email to change to
   */
  handleChangeEmailSubmit(email) {
    const { firebase, flash, profile } = this.props;
    // Close changeEmailDialogue
    this.setState({ changeEmailOpen: false });
    // CHeck if an email has been sent or the dialogue has just been cancled
    if (email !== null) {
      // Call updateEmail
      firebase.updateEmail(email)
        // Check for any errors
        .catch((err) => {
          // Too-old auth gets special handling
          if (err.code === 'auth/requires-recent-login') {
            // Notify User
            flash('warn', 'Login Verification Required', 'Please use the popup to login again.');
            // Trigger reauth sequence
            return this.reauth(profile.providerData[0].providerId)
              // Try updating email again
              .then(() => firebase.updateEmail(email));
          }
          // All other errors get rejected and sent to the next catch
          return Promise.reject(err);
        })
        // Send verification email to new email
        .then(() => firebase.auth().currentUser.sendEmailVerification())
        // Notify user that email was updated sucesffully
        .then(() => flash('success', 'Email Changed Succesfully', 'Check your email for the verification link.'))
        // Breaking error provides user with error output to provide to an admin
        .catch(err => flash('danger', 'Email Verification Failed to Send', (
          <p>
            Share the following error output with an administrator:
            <br />
            {err.message}
          </p>
        )))
        // Always reload auth
        .finally(() => firebase.reloadAuth());
    }
  }

  reauth(providerId) {
    const { firebase } = this.props;
    let provider;
    switch (providerId) {
      case 'google.com':
        provider = new firebase.auth.GoogleAuthProvider();
        break;

      case 'facebook.com':
        provider = new firebase.auth.FacebookAuthProvider();
        break;

      case 'twitter.com':
        provider = new firebase.auth.TwitterAuthProvider();
        break;

      case 'github.com':
        provider = new firebase.auth.GithubAuthProvider();
        break;

      default:
        return false;
    }

    return firebase.auth().currentUser.reauthenticateWithPopup(provider);
    // .then(UserCredential => firebase.login({ credential: UserCredential.credential }));
  }

  render() {
    const { profile, auth, classes } = this.props;
    const { showVerificationButton, changeEmailOpen } = this.state;
    return (
      <DashboardContainer isLoading={(!profile.isLoaded || !auth.isLoaded)} pageTitle="Account Settings">
        <Typography variant="title" gutterBottom>
          Account Settings
        </Typography>
        <p>
          Use this page to update your basic account information.
          Note that chainging your name may void your application.
        </p>
        <div className={classes.root}>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input id="name" defaultValue={profile.displayName} readOnly />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="email" error={!auth.emailVerified}>Email Address</InputLabel>
            <Input id="email" defaultValue={profile.email} error={!auth.emailVerified} readOnly />
            { !auth.emailVerified && (
              <FormHelperText error>
                Email isn&apos;t verified
                {showVerificationButton && (
                  <React.Fragment>
                    &nbsp;-&nbsp;
                    <button type="button" onClick={this.resendEmailVerification} className={classNames(classes.resetLink, classes.buttonLink)}>
                      Click Here
                    </button>
                    &nbsp;to resend the verification email.
                  </React.Fragment>)}
              </FormHelperText>
            )}
          </FormControl>
          <div className={classes.buttonRow}>
            <Button type="button" onClick={this.handleChangeEmailButton} className={classes.buttonRowButton}>
              Change Email
            </Button>
            <Button type="button" onClick={this.handleChangeEmailButton} className={classes.buttonRowButton}>
              Change Name
            </Button>
          </div>
        </div>
        <ChangeEmail open={changeEmailOpen} submitFunction={this.handleChangeEmailSubmit} />
      </DashboardContainer>
    );
  }
}

account.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  firebase: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  flash: PropTypes.func.isRequired,
};

// eslint-disable-next-line
const mapStateToProps = state => ({ });

const mapDispatchToProps = dispatch => ({
  flash: (type, title, message) => dispatch(createAndShowFlash(type, title, message)),
});

export default compose(
  withFirebase,
  withStyles(styles, { withTheme: true }),
  connect(
    ({ firebase: { profile, auth } }) => ({
      profile,
      auth,
    }),
  ),
  connect(mapStateToProps, mapDispatchToProps),
)(account);

const styles = theme => ({
  wrapper: {
    width: '100%',
    position: 'relative',
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  google: {
    backgroundColor: '#ea4335',
    '&:hover': {
      backgroundColor: '#a32e25',
    },
  },
  github: {
    backgroundColor: '#333333',
    '&:hover': {
      backgroundColor: '#232323',
    },
  },
  twitter: {
    backgroundColor: '#1da1f2',
    '&:hover': {
      backgroundColor: '#1470a9',
    },
  },
  facebook: {
    backgroundColor: '#3b5998',
    '&:hover': {
      backgroundColor: '#293e6a',
    },
  },
  mlh: {
    backgroundColor: '#f7db2f',
    '&:hover': {
      backgroundColor: '#F7E15D',
    },
  },
  googleProgress: {
    color: '#ea4335',
  },
  githubProgress: {
    color: '#333333',
  },
  twitterProgress: {
    color: '#1da1f2',
  },
  facebookProgress: {
    color: '#3b5998',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: 0,
    marginLeft: -12,
  },
});

export default styles;

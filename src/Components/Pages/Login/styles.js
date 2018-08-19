const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
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
});

export default styles;

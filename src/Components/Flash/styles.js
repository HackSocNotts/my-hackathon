import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';

const styles = theme => ({
  info: {
    color: blue[500],
  },
  infoIcon: {
    color: blue[500],
  },
  infoInverted: {
    backgroundColor: blue[500],
    color: 'white',
  },
  infoInvertedIcon: {
    colod: 'white',
  },
  success: {
    color: green[500],
  },
  successIcon: {
    color: green[500],
  },
  successInverted: {
    backgroundColor: green[500],
    color: 'white',
  },
  successInvertedIcon: {
    color: 'white',
  },
  warn: {
    color: amber[500],
  },
  warnIcon: {
    color: amber[500],
  },
  warnInverted: {
    backgroundColor: amber[500],
    color: 'black',
  },
  warnInvertedIcon: {
    color: 'black',
  },
  danger: {
    color: red[500],
  },
  dangerIcon: {
    color: red[500],
  },
  dangerInverted: {
    backgroundColor: red[500],
    color: 'white',
  },
  dangerInvertedIcon: {
    color: 'white',
  },
});

export default styles;

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import green from '@material-ui/core/colors/green';
import blueGrey from '@material-ui/core/colors/blueGrey';

const theme = createMuiTheme({
  palette: {
    secondary: {
      light: blueGrey[300],
      main: blueGrey[500],
      dark: blueGrey[700],
    },
    primary: {
      light: '#77c36b',
      main: '#56b447',
      dark: '#3c7d31',
      contrastText: '#FFF',
    },
    type: 'light',
  },
});

export default theme;

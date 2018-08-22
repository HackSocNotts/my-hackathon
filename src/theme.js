import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import blueGrey from '@material-ui/core/colors/blueGrey';

const theme = createMuiTheme({
  pallete: {
    secondary: {
      main: green.A700,
    },
    primary: {
      light: blueGrey[300],
      main: blueGrey[500],
      dark: blueGrey[700],
    },
    type: 'dark',
  },
});

export default theme;

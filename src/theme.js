import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import secondary from '@material-ui/core/colors/amber';

const hacknottsGreen = {
  light: '#89e776',
  main: '#56b447',
  dark: '#1c8317',
  contrastText: '#ffffff',
};

const theme = createMuiTheme({
  palette: {
    primary: hacknottsGreen,
    // secondary: {
    //   light: '#50555e',
    //   main: '#282c34',
    //   dark: '#00000d',
    //   contrastText: '#ffffff',
    // },
    secondary,
    type: 'light',
  },
});

export default theme;

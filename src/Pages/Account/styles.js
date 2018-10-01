import blue from '@material-ui/core/colors/blue';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  margin: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  buttonLink: {
    background: 'none',
    fontWeight: 'strong',
    color: blue[500],
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    '&:hover': {
      color: blue[700],
    },
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonRowButton: {
    width: '100%',
  },
});

export default styles;

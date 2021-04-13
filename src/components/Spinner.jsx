import { CircularProgress, makeStyles } from '@material-ui/core';
import { memo } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(5, 0),
  },
}));

const Spinner = ({ color = 'secondary', size = '4em' }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress color={color} size={size} />
    </div>
  );
};

export default memo(Spinner);

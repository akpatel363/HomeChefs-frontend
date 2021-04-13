import {
  Button,
  ButtonGroup,
  Icon,
  makeStyles,
  Typography as Text,
} from '@material-ui/core';
import { memo } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  icon: { fontSize: 64 },
  text: { marginBottom: theme.spacing(1) },
  root: {
    margin: theme.spacing(2, 0),
    textAlign: 'center',
  },
}));

const FullScreenError = ({ icon, children, action, back = true }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {icon && (
        <Icon className={classes.icon} color='error'>
          {icon}
        </Icon>
      )}
      <Text variant='h5' className={classes.text}>
        {children}
      </Text>
      <ButtonGroup>
        {action}
        {back && (
          <Button variant='outlined' onClick={() => history.goBack()}>
            Go Back
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
};

export default memo(FullScreenError);

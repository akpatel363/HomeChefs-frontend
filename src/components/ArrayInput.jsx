import { Icon, IconButton, makeStyles, TextField } from '@material-ui/core';
import { memo } from 'react';

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: theme.spacing(2),
    '& .MuiIconButton-root': { marginLeft: theme.spacing(0.5) },
  },
}));

const ArrayInput = ({ index: i, placeholder, remove, insert, ...rest }) => {
  const classes = useStyles();

  return (
    <TextField
      fullWidth
      variant='outlined'
      label={`${placeholder} ${i + 1}`}
      className={classes.input}
      InputProps={{
        endAdornment: (
          <>
            <IconButton
              color='secondary'
              size='small'
              onClick={() => remove(i)}
            >
              <Icon>delete</Icon>
            </IconButton>
            <IconButton
              color='secondary'
              size='small'
              onClick={() => insert(i + 1, '')}
            >
              <Icon>add</Icon>
            </IconButton>
          </>
        ),
      }}
      {...rest}
    />
  );
};

export default memo(ArrayInput);

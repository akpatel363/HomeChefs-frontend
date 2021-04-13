import { Chip, makeStyles, TextField } from '@material-ui/core';
import { FieldArray } from 'formik';

const useStyles = makeStyles((theme) => ({
  input: {
    '& .MuiInputBase-root': {
      display: 'flex',
      flexFlow: 'row wrap',
    },
    '& .MuiInputBase-input': {
      flexGrow: 1,
      width: 'auto',
    },
  },
  chip: {
    margin: theme.spacing(0, 0, 0.5, 0.5),
    '&:last-of-type': { marginRight: theme.spacing(1) },
  },
}));

const ChipInput = ({ name }) => {
  const classes = useStyles();
  return (
    <FieldArray name={name}>
      {({ push, remove, form: { values, errors } }) => (
        <TextField
          fullWidth
          type='text'
          label='Tags'
          error={!!errors[name]}
          className={classes.input}
          helperText={!!errors[name] && errors[name]}
          InputProps={{
            startAdornment: values[name]?.map((v, i) => (
              <Chip
                key={v}
                label={v}
                size='small'
                className={classes.chip}
                onDelete={() => remove(i)}
              />
            )),
          }}
          onKeyUp={(e) => {
            if (e.key === ' ') {
              if (e.target.value?.trim()) push(e.target.value?.trim());
              e.target.value = '';
            }
          }}
          onBlur={(e) => {
            if (e.target.value?.trim()) push(e.target.value?.trim());
            e.target.value = '';
          }}
        />
      )}
    </FieldArray>
  );
};

export default ChipInput;

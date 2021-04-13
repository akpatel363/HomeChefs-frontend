import { TextField } from '@material-ui/core';
import { FastField } from 'formik';

const InputField = ({ name, children, ...rest }) => {
  return (
    <FastField name={name}>
      {({ field, meta }) => {
        return (
          <TextField
            fullWidth
            variant='outlined'
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            {...field}
            {...rest}
          >
            {children}
          </TextField>
        );
      }}
    </FastField>
  );
};

export default InputField;

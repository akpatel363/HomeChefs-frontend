import { FormControlLabel, Switch } from '@material-ui/core';
import { FastField } from 'formik';

const SwitchField = ({ name, label, ...rest }) => {
  return (
    <FastField name={name}>
      {({ field }) => (
        <FormControlLabel
          label={label}
          control={<Switch checked={field.value} {...field} {...rest} />}
        />
      )}
    </FastField>
  );
};

export default SwitchField;

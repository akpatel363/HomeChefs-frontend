import { Button } from '@material-ui/core';
import { FieldArray } from 'formik';
import { memo } from 'react';
import ArrayInput from './ArrayInput';
import Message from './Message';

const ArrayField = ({ name, label }) => (
  <FieldArray name={name}>
    {({
      insert,
      push,
      remove,
      form: { values, errors, touched, getFieldProps },
    }) => (
      <>
        <Button variant='outlined' onClick={() => push('')}>
          Add {label}
        </Button>
        {values[name].map((v, i) => (
          <ArrayInput
            key={i}
            index={i}
            remove={remove}
            insert={insert}
            placeholder={label}
            error={touched[name]?.[i] && !!errors[name]?.[i]}
            helperText={touched[name]?.[i] && errors[name]?.[i]}
            {...getFieldProps(`${name}.${i}`)}
          />
        ))}
        {typeof errors[name] == 'string' && (
          <Message severity='error' message={errors[name]} />
        )}
      </>
    )}
  </FieldArray>
);

export default memo(ArrayField);

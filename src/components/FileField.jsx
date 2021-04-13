import {
  Button,
  Chip,
  Icon,
  Link,
  makeStyles,
  Typography as Text,
} from '@material-ui/core';
import { FastField } from 'formik';

const useStyles = makeStyles((theme) => ({
  anchor: { marginBottom: theme.spacing(0.5) },
}));

const FileField = ({ name, file }) => {
  const classes = useStyles();
  return (
    <>
      {file && (
        <Text className={classes.anchor}>
          <Link
            href={process.env.REACT_APP_URL + file}
            rel='noreferrer'
            target='_blank'
          >
            Current Image
          </Link>
        </Text>
      )}
      <FastField name={name}>
        {({
          field: { value },
          meta: { touched, error },
          form: { setFieldValue },
        }) => (
          <>
            {value ? (
              <Chip
                variant='outlined'
                color='secondary'
                label={value.name}
                icon={<Icon>image</Icon>}
                deleteIcon={<Icon>close</Icon>}
                onDelete={() => setFieldValue('image', null)}
              />
            ) : (
              <Button
                component='label'
                variant='contained'
                color='secondary'
                startIcon={<Icon>attach_file</Icon>}
              >
                Choose File
                <input
                  hidden
                  type='file'
                  onChange={(e) =>
                    setFieldValue('image', e.currentTarget.files[0])
                  }
                />
              </Button>
            )}
            {touched && error && (
              <Text color='error' variant='body2'>
                {error}
              </Text>
            )}
          </>
        )}
      </FastField>
    </>
  );
};

export default FileField;

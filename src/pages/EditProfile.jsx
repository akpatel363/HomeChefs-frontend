import {
  Button,
  Icon,
  makeStyles,
  Snackbar,
  TextField,
  Typography as Text,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { formHeaderStyles } from '../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../store/actions/auth';
import { useEffect, useState } from 'react';
import { Alert } from '@material-ui/lab';
import { UPDATE_PROFILE } from '../store/actions/actions';
import useTask from '../hooks/useTask';
import getDifference from '../utils/difference';
import Message from '../components/Message';
import InputField from '../components/InputField';

const useStyles = makeStyles(formHeaderStyles);

const EditProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const task = useTask(UPDATE_PROFILE);
  const [open, setOpen] = useState(false);
  const profile = useSelector((s) => s.auth.user);

  return (
    <>
      <div className={classes.content}>
        <Icon className={classes.icon}>person</Icon>
        <Text variant='h4' className={classes.text}>
          Edit Profile
        </Text>
      </div>
      {task?.error && (
        <Message
          severity='error'
          message={task.error}
          className={classes.message}
        />
      )}
      <div className={classes.form}>
        <TextField
          disabled
          fullWidth
          label='Username'
          variant='outlined'
          value={profile.username}
        />
        <TextField
          disabled
          fullWidth
          label='Email'
          variant='outlined'
          value={profile.email}
        />
        <Formik
          initialValues={{
            last_name: profile.last_name,
            first_name: profile.first_name,
          }}
          onSubmit={(values) => {
            if (task?.loading) return;
            const obj = getDifference(values, profile);
            if (Object.keys(obj).length > 0)
              dispatch(updateProfile(obj, () => setOpen(true)));
          }}
        >
          <Form className={classes.form}>
            <InputField name='first_name' label='First Name' />
            <InputField name='last_name' label='Last Name' />
            <Button
              size='large'
              type='submit'
              color='secondary'
              variant='contained'
              disabled={task?.loading}
            >
              Update Profile
            </Button>
          </Form>
        </Formik>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert variant='filled' severity='success'>
          Profile updated.
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditProfile;

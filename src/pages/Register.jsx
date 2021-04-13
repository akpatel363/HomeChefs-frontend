import {
  Button,
  makeStyles,
  Icon,
  Typography as Text,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { formStyles } from '../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_LOGIN } from '../store/actions/actions';
import { authenticate } from '../store/actions/auth';
import * as Yup from 'yup';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import InputField from '../components/InputField';
import Anchor from '../components/Anchor';

const registrationSchema = Yup.object({
  username: Yup.string().required('Username is required.'),
  email: Yup.string().email().required('Email is required.'),
  password: Yup.string()
    .required('Password is required.')
    .min(8, 'Password must contain atleast 8 characters.'),
});

const useStyles = makeStyles(formStyles);

const Register = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.task[AUTH_LOGIN]);

  if (auth?.loading) return <Spinner />;

  return (
    <div className={classes.root}>
      <Text variant='h6' className={classes.text}>
        <Icon className={classes.icon}>add</Icon>
      </Text>
      <Text variant='h5' className={classes.text}>
        Register
      </Text>
      <Formik
        validationSchema={registrationSchema}
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={({ password, ...rest }) =>
          dispatch(
            authenticate(
              { ...rest, password1: password, password2: password },
              props.history,
              'register'
            )
          )
        }
      >
        <Form className={classes.form}>
          <InputField label='Username' name='username' />
          <InputField label='Email' name='email' />
          <InputField type='password' label='Password' name='password' />
          {auth?.error && <Message severity='error' message={auth.error} />}
          <Button fullWidth type='submit' variant='contained' color='primary'>
            Register
          </Button>
          <Text className={classes.link}>
            <Anchor to='/login'>Already have an account?</Anchor>
          </Text>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;

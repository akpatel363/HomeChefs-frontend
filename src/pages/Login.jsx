import {
  Button,
  makeStyles,
  Icon,
  Typography as Text,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { formStyles } from '../styles/styles';
import { authenticate } from '../store/actions/auth';
import { AUTH_LOGIN } from '../store/actions/actions';
import * as Yup from 'yup';
import Anchor from '../components/Anchor';
import Message from '../components/Message';
import InputField from '../components/InputField';
import useTask from '../hooks/useTask';

const loginSchema = Yup.object({
  username: Yup.string().required('Username is required.'),
  password: Yup.string()
    .required('Password is required.')
    .min(8, 'Password must contain atleast 8 characters.'),
});

const useStyles = makeStyles(formStyles);

const Login = (props) => {
  const task = useTask(AUTH_LOGIN);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Text variant='h6' className={classes.text}>
        <Icon className={classes.icon}>person</Icon>
      </Text>
      <Text variant='h5' className={classes.text}>
        Login
      </Text>
      <Formik
        validateOnChange={false}
        validationSchema={loginSchema}
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => dispatch(authenticate(values, props.history))}
      >
        <Form className={classes.form}>
          <InputField label='Username' name='username' />
          <InputField type='password' label='Password' name='password' />
          {task?.error && <Message message={task.error} />}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={task?.loading}
          >
            Login
          </Button>
          <Text className={classes.link}>
            <Anchor to='/register'>Don't have an account?</Anchor>
          </Text>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;

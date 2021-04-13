import { Box, Button, TextField, Typography as Text } from '@material-ui/core';
import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setRedirect } from '../store/actions/auth';
import { POST_QUESTION } from '../store/actions/actions';
import { postQuestion } from '../store/actions/questions';
import useTask from '../hooks/useTask';
import Spinner from './Spinner';
import Message from './Message';

const QuestionForm = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [error, setError] = useState('');
  const [question, setQuestion] = useState('');
  const task = useTask(POST_QUESTION);
  const isAuthenticated = useSelector((state) => !!state.auth.token);

  if (!isAuthenticated)
    return (
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Text>Login to ask any question.</Text>
        <Button
          to='/login'
          component={Link}
          color='secondary'
          variant='contained'
          onClick={() => dispatch(setRedirect(location.pathname))}
        >
          Login
        </Button>
      </Box>
    );

  if (task?.loading) return <Spinner />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!question) return setError('Cannot be blank.');
        dispatch(postQuestion({ question }));
      }}
    >
      <Text variant='h5' style={{ marginBottom: 12 }}>
        Ask Question
      </Text>
      {task?.error && (
        <Message
          severity='error'
          style={{ margin: '12px 0' }}
          message={task.error}
        />
      )}
      <TextField
        rows={4}
        multiline
        fullWidth
        label='Question'
        error={!!error}
        value={question}
        variant='outlined'
        helperText={error && error}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Button
        fullWidth
        type='submit'
        color='primary'
        variant='outlined'
        style={{ marginTop: '16px' }}
      >
        Submit
      </Button>
    </form>
  );
};

export default memo(QuestionForm);

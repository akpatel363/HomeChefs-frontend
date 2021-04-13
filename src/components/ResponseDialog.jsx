import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import useTask from '../hooks/useTask';
import { POST_ANSWER } from '../store/actions/actions';
import { postAnswer } from '../store/actions/questions';
import Message from './Message';
import Spinner from './Spinner';

const ResponseDialog = ({ question, onClose }) => {
  const dispatch = useDispatch();
  const task = useTask(POST_ANSWER);
  const [text, setText] = useState('');

  let content = (
    <>
      <DialogContent>
        <DialogContentText>{question?.question}</DialogContentText>
        <TextField
          rows={3}
          multiline
          fullWidth
          value={text}
          label='Response'
          variant='outlined'
          onChange={(e) => setText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button
          disabled={!text}
          color='secondary'
          onClick={() =>
            dispatch(
              postAnswer(text, question?.id, () => {
                setText('');
                onClose();
              })
            )
          }
        >
          Submit
        </Button>
      </DialogActions>
    </>
  );

  if (task?.loading) content = <Spinner />;
  else if (task?.error)
    content = <Message severity='error' message={task?.error} />;

  return (
    <Dialog open={!!question} onClose={() => onClose()} fullWidth>
      <DialogTitle>Respond</DialogTitle>
      {content}
    </Dialog>
  );
};

export default memo(ResponseDialog);

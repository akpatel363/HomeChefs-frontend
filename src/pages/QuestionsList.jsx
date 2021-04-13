import { Box, Button, Grid } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_QUESTIONS, POST_ANSWER } from '../store/actions/actions';
import { resetTask } from '../store/actions/task';
import { fetchQuestions } from '../store/actions/questions';
import useTask from '../hooks/useTask';
import QuestionTile from '../components/QuestionTile';
import FSError from '../components/FullScreenError';
import ResponseDialog from '../components/ResponseDialog';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';

const QuestionsList = ({ location: { search } }) => {
  const task = useTask(FETCH_QUESTIONS);
  const dispatch = useDispatch();
  const { questions, count, search: old } = useSelector((s) => s.questions);
  const [active, setActive] = useState(null);

  const onRespond = useCallback(
    (question) => {
      !question && dispatch(resetTask(POST_ANSWER));
      setActive(question);
    },
    [dispatch]
  );

  useEffect(() => {
    if (old !== search) dispatch(fetchQuestions(search));
  }, [old, search, dispatch]);

  if (!task || task?.loading) return <Spinner />;

  return (
    <>
      <Box marginBottom={2}>
        <SearchBar placeholder='Search questions...' />
      </Box>
      {task.error || questions?.length === 0 ? (
        <FSError
          icon='error'
          action={
            task?.error && (
              <Button onClick={() => dispatch(fetchQuestions(search))}>
                Retry
              </Button>
            )
          }
        >
          {task?.error || 'No Questions found'}
        </FSError>
      ) : (
        <Grid container spacing={2}>
          {questions?.map((q) => (
            <Grid item key={q.id} xs={12} md={6}>
              <QuestionTile question={q} onSelect={onRespond} />
            </Grid>
          ))}
        </Grid>
      )}
      <Pagination count={count} />
      <ResponseDialog question={active} onClose={onRespond} />
    </>
  );
};

export default QuestionsList;

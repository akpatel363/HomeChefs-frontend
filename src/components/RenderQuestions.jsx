import { Button } from '@material-ui/core';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_QUESTIONS } from '../store/actions/actions';
import { useLocation } from 'react-router-dom';
import { fetchQuestions } from '../store/actions/questions';
import useTask from '../hooks/useTask';
import Question from './Question';
import FSError from './FullScreenError';
import Spinner from './Spinner';
import Pagination from './Pagination';

export const RenderQuestions = () => {
  const dispatch = useDispatch();
  const task = useTask(FETCH_QUESTIONS);
  const [active, setActive] = useState(0);
  const { search } = useLocation();
  const { questions, count, search: old } = useSelector((s) => s.questions);

  useEffect(() => {
    if (search !== old) dispatch(fetchQuestions(search));
  }, [old, search, dispatch]);

  const onChange = (id) => (id === active ? setActive(0) : setActive(id));

  if (!task || task?.loading) return <Spinner />;

  if (task?.error || questions?.length === 0)
    return (
      <FSError
        action={
          task?.error && (
            <Button onClick={() => dispatch(fetchQuestions(search))}>
              Retry
            </Button>
          )
        }
      >
        {task?.error || 'No questions'}
      </FSError>
    );

  return (
    <div style={{ margin: '8px, 0' }}>
      {questions?.map((q) => (
        <Question
          key={q.id}
          question={q}
          onChange={onChange}
          expanded={active === q.id}
        />
      ))}
      <Pagination count={count} />
    </div>
  );
};

export default memo(RenderQuestions);

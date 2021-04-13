import { Grid } from '@material-ui/core';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FETCH_RATINGS } from '../store/actions/actions';
import { fetchRatings } from '../store/actions/ratings';
import useTask from '../hooks/useTask';
import FSError from './FullScreenError';
import Spinner from './Spinner';
import Rating from './Rating';
import Pagination from './Pagination';

const RenderRatings = () => {
  const dispatch = useDispatch();
  const task = useTask(FETCH_RATINGS);
  const { count, ratings, search: old } = useSelector((s) => s.ratings);
  const { search } = useLocation();

  useEffect(() => {
    if (old !== search) dispatch(fetchRatings(search));
  }, [old, search, dispatch]);

  if (!task || task?.loading) return <Spinner />;

  if (task?.error || ratings?.length === 0)
    return <FSError>{task?.error || 'Not rated yet.'}</FSError>;

  return (
    <>
      <Grid container spacing={2}>
        {ratings?.map((r) => (
          <Grid item xs={12} sm={6} key={r.id}>
            <Rating rating={r} />
          </Grid>
        ))}
      </Grid>
      <Pagination count={count} />
    </>
  );
};

export default memo(RenderRatings);

import { Button, makeStyles, Typography as Text } from '@material-ui/core';
import { fetchMyRating, postOrUpdateRating } from '../store/actions/ratings';
import { memo, useEffect } from 'react';
import { Rating as StarInput } from '@material-ui/lab';
import { Link, useLocation } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_MY_RATING } from '../store/actions/actions';
import { setRedirect } from '../store/actions/auth';
import * as Yup from 'yup';
import useTask from '../hooks/useTask';
import Spinner from './Spinner';
import InputField from './InputField';

const ratingSchema = Yup.object({
  stars: Yup.number().required().min(1).max(5),
  body: Yup.string()
    .required('Required')
    .max(120, 'Only 120 characters allowed.'),
});

const useStyles = makeStyles((theme) => ({
  starInput: { margin: theme.spacing(1, 0, 2) },
  button: { margin: theme.spacing(2, 0) },
  center: {
    textAlign: 'center',
    '& > *': { marginBottom: theme.spacing(1) },
  },
}));

const MyRating = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const task = useTask(FETCH_MY_RATING);
  const { rating, auth } = useSelector((state) => ({
    auth: state.auth.token !== null,
    rating: state.ratings.myRating,
  }));

  useEffect(() => {
    if (auth && !rating) dispatch(fetchMyRating());
  }, [auth, rating, dispatch]);

  if (!auth)
    return (
      <div className={classes.center}>
        <Text align='center'>Login to rate this recipe.</Text>
        <Button
          to='/login'
          component={Link}
          color='secondary'
          variant='contained'
          onClick={() => dispatch(setRedirect(location.pathname))}
        >
          Login
        </Button>
      </div>
    );

  if (task?.loading) return <Spinner />;

  return (
    <>
      <Text variant='h5'>
        {rating ? 'Update your rating' : 'Rate this recipe'}
      </Text>
      <Formik
        initialValues={{
          body: rating?.body || '',
          stars: rating?.stars || 1,
        }}
        validationSchema={ratingSchema}
        onSubmit={(values) => dispatch(postOrUpdateRating(values))}
      >
        {({ getFieldProps, values }) => (
          <Form>
            <div className={classes.starInput}>
              <StarInput
                {...getFieldProps('stars')}
                value={Number(values.stars)}
              />
            </div>
            <InputField multiline rows={3} label='Review' name='body' />
            <Button
              fullWidth
              type='submit'
              color='primary'
              variant='outlined'
              className={classes.button}
            >
              {rating ? 'Update' : 'Post'}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default memo(MyRating);

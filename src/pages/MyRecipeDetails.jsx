import {
  Chip,
  Divider,
  Grid,
  Icon,
  Tab,
  Typography as Text,
  makeStyles,
  Button,
} from '@material-ui/core';
import { EDIT_RECIPE, FETCH_DETAILS } from '../store/actions/actions';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { fetchDetails, resetActiveRecipe } from '../store/actions/activeRecipe';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, image } from '../utils/filters';
import { resetTask } from '../store/actions/task';
import { useEffect } from 'react';
import useTask from '../hooks/useTask';
import EditRecipe from './EditRecipe';
import NavigationTabs from '../components/NavigationTabs';
import FullScreenError from '../components/FullScreenError';
import Ratings from './Ratings';
import QuestionsList from './QuestionsList';
import Spinner from '../components/Spinner';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(1) },
  divider: { margin: theme.spacing(1, 0) },
  icon: { color: '#f2b01e' },
  chip: { marginTop: theme.spacing(1) },
}));

const MyRecipeDetails = ({ match: { params, path, url } }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const task = useTask(FETCH_DETAILS);
  const recipe = useSelector((state) => state.activeRecipe.details);

  useEffect(() => {
    dispatch(fetchDetails(params.id));
    return () => {
      dispatch(resetTask(EDIT_RECIPE));
      dispatch(resetActiveRecipe());
    };
  }, [params.id, dispatch]);

  if (task?.error)
    return (
      <FullScreenError
        icon='error'
        action={
          <Button onClick={() => dispatch(fetchDetails(params.id))}>
            Retry
          </Button>
        }
      >
        {task.error}
      </FullScreenError>
    );

  if (!task || task?.loading || !recipe) return <Spinner />;

  return (
    <>
      <Grid container spacing={2} className={classes.root}>
        <Grid item sm={6} md={4} lg={3}>
          <img
            width='100%'
            alt={recipe.name}
            src={image(recipe.image, false)}
          />
        </Grid>
        <Grid item sm={6} md={8} lg={9}>
          <Text variant='h4'>{recipe.name}</Text>
          <Chip
            variant='outlined'
            className={classes.chip}
            icon={<Icon className={classes.icon}>star</Icon>}
            label={recipe.stars || 'No rated yet'}
          />
          <Divider className={classes.divider} />
          <Text>Created - {formatDate(recipe.created)}</Text>
          <Text>Last updated - {formatDate(recipe.updated)}</Text>
        </Grid>
      </Grid>
      <NavigationTabs tabs={['edit', 'ratings', 'questions']}>
        <Tab component={Link} to={`${url}/edit`} label='Edit' />
        <Tab component={Link} to={`${url}/ratings`} label='Ratings' />
        {recipe.allow_questions && (
          <Tab component={Link} to={`${url}/questions`} label='Questions' />
        )}
      </NavigationTabs>
      <Switch>
        <Route path={`${path}/edit`} component={EditRecipe} />
        <Route path={`${path}/ratings`} render={() => <Ratings author />} />
        {recipe.allow_questions && (
          <Route path={`${path}/questions`} component={QuestionsList} />
        )}
        <Redirect to={`${path}/edit`} />
      </Switch>
    </>
  );
};

export default MyRecipeDetails;

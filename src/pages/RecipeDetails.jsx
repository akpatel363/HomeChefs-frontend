import {
  Button,
  Chip,
  Icon,
  IconButton,
  Link as Anchor,
  makeStyles,
  Tab,
  Typography as Text,
} from '@material-ui/core';
import { useEffect, memo } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_DETAILS } from '../store/actions/actions';
import { formatDate, plural, image, representTime } from '../utils/filters';
import { fetchDetails, resetActiveRecipe } from '../store/actions/activeRecipe';
import useTask from '../hooks/useTask';
import TypeIcon from '../components/TypeIcon';
import Steps from './Steps';
import Ratings from './Ratings';
import Questions from './Questions';
import Spinner from '../components/Spinner';
import TagChip from '../components/TagChip';
import NavigationTabs from '../components/NavigationTabs';
import FullScreenError from '../components/FullScreenError';
import SimilarRecipes from '../components/SimilarRecipes';

const useStyles = makeStyles((theme) => ({
  root: { margin: theme.spacing(2, 0) },
  author: { marginTop: theme.spacing(1) },
  image: {
    maxWidth: '100%',
    display: 'block',
    margin: theme.spacing(2, 'auto'),
  },
  chipContainer: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row wrap',
    '& > *': { margin: theme.spacing(1, 1, 0, 0) },
  },
}));

const RecipeData = memo((props) => {
  const classes = useStyles();
  const { recipe, username } = useSelector((s) => ({
    username: s.auth.user?.username,
    recipe: s.activeRecipe.details,
  }));

  return (
    <div className={classes.root}>
      <Text variant='h4'>
        {recipe.name}
        {username === recipe.author.username && (
          <IconButton component={Link} to={`/my/${recipe.id}`}>
            <Icon>edit</Icon>
          </IconButton>
        )}
      </Text>
      <div className={classes.chipContainer}>
        <TypeIcon type={recipe.food_type} />
        <Chip
          icon={<Icon>timer</Icon>}
          label={representTime(recipe.cooking_time)}
        />
        <Chip
          icon={<Icon>people</Icon>}
          label={`${recipe.servings} Serving${plural(recipe.servings)}`}
        />
      </div>
      <div className={classes.chipContainer}>
        {recipe?.tags?.map((t) => (
          <TagChip key={t} tag={t} size='small' />
        ))}
      </div>
      <Text className={classes.author}>
        Posted by{' '}
        <Anchor component={Link} to={`/author/${recipe.author.id}`}>
          {recipe.author.name}
        </Anchor>{' '}
        on {formatDate(recipe.created)}.
      </Text>
      <div>
        <img
          alt={recipe.name}
          className={classes.image}
          src={image(recipe.image, false)}
        />
      </div>
      <Text>{recipe.description}</Text>
    </div>
  );
});

const RecipeDetails = ({ match: { params, path, url } }) => {
  const dispatch = useDispatch();
  const task = useTask(FETCH_DETAILS);
  const recipe = useSelector((s) => s.activeRecipe.details);

  useEffect(() => {
    dispatch(fetchDetails(params.id));
    return () => dispatch(resetActiveRecipe());
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
      <RecipeData />
      <NavigationTabs tabs={['steps', 'ratings', 'questions']}>
        <Tab component={Link} to={`${url}/steps`} label='Steps' />
        <Tab component={Link} to={`${url}/ratings`} label='Ratings' />
        {recipe.allow_questions && (
          <Tab component={Link} to={`${url}/questions`} label='Questions' />
        )}
      </NavigationTabs>
      <Switch>
        <Route path={`${path}/steps`} component={Steps} />
        <Route path={`${path}/ratings`} component={Ratings} />
        {recipe.allow_questions && (
          <Route path={`${path}/questions`} component={Questions} />
        )}
        <Redirect to={`${url}/steps`} />
      </Switch>
      <SimilarRecipes />
    </>
  );
};

export default RecipeDetails;

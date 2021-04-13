import { DELETE_RECIPE, FETCH_MY_RECIPES } from '../store/actions/actions';
import { Button, Fab, Grid, Icon, makeStyles } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyRecipes } from '../store/actions/myRecipes';
import { resetTask } from '../store/actions/task';
import { Link } from 'react-router-dom';
import useTask from '../hooks/useTask';
import Spinner from '../components/Spinner';
import RecipeCard from '../components/RecipeCard';
import DeletionDialog from '../components/DeletionDialog';
import FullScreenError from '../components/FullScreenError';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(1) },
  fab: {
    right: 20,
    bottom: 20,
    position: 'fixed',
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const task = useTask(FETCH_MY_RECIPES);
  const [activeRecipe, setActiveRecipe] = useState(null);
  const recipes = useSelector((state) => state.myRecipes);

  useEffect(() => {
    if (!recipes) dispatch(fetchMyRecipes());
  }, [recipes, dispatch]);

  const onDelete = useCallback(
    (recipe) => {
      !recipe && dispatch(resetTask(DELETE_RECIPE));
      setActiveRecipe(recipe);
    },
    [dispatch]
  );

  if (!task || task?.loading) return <Spinner />;

  if (task?.error || recipes?.length === 0)
    return (
      <>
        <FullScreenError
          icon='error'
          action={
            <Button onClick={() => dispatch(fetchMyRecipes())}>Retry</Button>
          }
        >
          {task?.error || "You haven't posted any recipes"}
        </FullScreenError>
        <Fab
          component={Link}
          to='/post/recipe'
          color='secondary'
          variant='extended'
          className={classes.fab}
        >
          <Icon>add</Icon> Add
        </Fab>
      </>
    );

  return (
    <>
      <Grid container spacing={2} className={classes.root}>
        {recipes?.map((r) => (
          <Grid item xs={12} md={6} key={r.id}>
            <RecipeCard recipe={r} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
      <DeletionDialog onClose={onDelete} recipe={activeRecipe} />
      <Fab
        component={Link}
        color='secondary'
        to='/post/recipe'
        variant='extended'
        className={classes.fab}
      >
        <Icon>add</Icon> Post
      </Fab>
    </>
  );
};

export default Dashboard;

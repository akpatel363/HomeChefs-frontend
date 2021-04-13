import { Icon, makeStyles, Typography as Text } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { POST_RECIPE } from '../store/actions/actions';
import { postRecipe } from '../store/actions/myRecipes';
import { formHeaderStyles } from '../styles/styles';
import RecipeForm from '../components/RecipeForm';
import Message from '../components/Message';

const useStyles = makeStyles(formHeaderStyles);

const PostRecipe = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const task = useSelector((s) => s.task[POST_RECIPE]);

  return (
    <>
      <div className={classes.content}>
        <Icon className={classes.icon}>local_pizza</Icon>
        <Text variant='h4'>Post Recipe</Text>
      </div>
      {task?.error && (
        <Message
          severity='error'
          message={task.error}
          className={classes.message}
        />
      )}
      <RecipeForm
        loading={task?.loading}
        onSubmit={(values) => {
          if (task && task?.loading) return null;
          dispatch(postRecipe(values, () => props.history.push('/dashboard')));
        }}
      />
    </>
  );
};

export default PostRecipe;

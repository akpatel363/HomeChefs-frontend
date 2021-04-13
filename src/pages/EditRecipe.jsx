import {
  Icon,
  makeStyles,
  Snackbar,
  Typography as Text,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_RECIPE } from '../store/actions/actions';
import { editRecipe } from '../store/actions/myRecipes';
import { memo, useState } from 'react';
import { formHeaderStyles } from '../styles/styles';
import useTask from '../hooks/useTask';
import getDifference from '../utils/difference';
import RecipeForm from '../components/RecipeForm';
import Message from '../components/Message';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(formHeaderStyles);

const EditRecipe = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const recipe = useSelector((s) => s.activeRecipe.details);
  const task = useTask(EDIT_RECIPE);

  return (
    <>
      <div className={classes.content}>
        <Icon className={classes.icon}>edit</Icon>
        <Text variant='h4' className={classes.text}>
          Edit Recipe
        </Text>
      </div>
      {task?.error && (
        <Message message={task.error} className={classes.message} />
      )}
      <RecipeForm
        file={recipe.image}
        loading={task?.loading}
        initialValues={recipe}
        onSubmit={({ image, ...values }) => {
          const obj = getDifference(values, recipe);
          if (image || Object.keys(obj).length)
            dispatch(editRecipe(image, obj, () => setOpen(true)));
        }}
      />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert variant='filled' severity='success'>
          Recipe Updated
        </Alert>
      </Snackbar>
    </>
  );
};

export default memo(EditRecipe);

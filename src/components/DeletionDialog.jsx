import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { DELETE_RECIPE } from '../store/actions/actions';
import { deleteRecipe } from '../store/actions/myRecipes';
import useTask from '../hooks/useTask';
import Spinner from './Spinner';
import Message from './Message';

const DeletionDialog = ({ onClose, recipe }) => {
  const dispatch = useDispatch();
  const task = useTask((state) => state.task[DELETE_RECIPE]);

  let content = (
    <>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {recipe?.name}? You cannot undo this
          action.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color='secondary'
          onClick={() => dispatch(deleteRecipe(recipe?.id, () => onClose()))}
        >
          Yes
        </Button>
        <Button color='secondary' onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </>
  );

  if (task?.loading) content = <Spinner />;
  else if (task?.error)
    content = <Message severity='error' message={task?.error} />;

  return (
    <Dialog open={!!recipe} onClose={() => onClose()} fullWidth>
      <DialogTitle>Confirm Deletion</DialogTitle>
      {content}
    </Dialog>
  );
};

export default DeletionDialog;

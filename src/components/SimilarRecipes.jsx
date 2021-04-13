import {
  Button,
  Divider,
  makeStyles,
  Typography as Text,
} from '@material-ui/core';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import Spinner from './Spinner';
import FSError from './FullScreenError';
import RecipeTile from './RecipeTile';

const useStyles = makeStyles((theme) => ({
  divider: { margin: theme.spacing(2, 0) },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    marginBottom: theme.spacing(1),
  },
}));

const SimilarRecipes = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [{ loading, response, error }, retry] = useAxios(
    `/recipes/${id}/similar/`
  );

  if (loading) return <Spinner />;

  if (error || response?.length === 0)
    return (
      <FSError
        back={false}
        action={error && <Button onClick={() => retry()}>Retry</Button>}
      >
        {error || 'No similar recipes found.'}
      </FSError>
    );

  return (
    <>
      <Divider className={classes.divider} />
      <Text variant='h5' style={{ margin: '12px 0 8px' }}>
        Similar Recipes
      </Text>
      <div className={classes.container}>
        {response?.map((r) => (
          <RecipeTile recipe={r} key={r.id} />
        ))}
      </div>
    </>
  );
};

export default memo(SimilarRecipes);

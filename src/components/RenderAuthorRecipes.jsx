import { Button, Grid, Typography as Text } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import FSError from './FullScreenError';
import Recipe from './Recipe';
import Spinner from './Spinner';
import Pagination from './Pagination';
import { memo } from 'react';

const RenderAuthorRecipes = (props) => {
  const {
    params: { id },
  } = useRouteMatch();
  const [{ loading, error, response }, retry] = useAxios(
    `/authors/${id}/recipes`
  );

  if (loading) return <Spinner />;
  if (error || response?.results.length === 0)
    return (
      <FSError
        icon='error'
        action={error && <Button onClick={retry}>Retry</Button>}
      >
        {error || 'No recipes posted.'}
      </FSError>
    );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Text variant='h5' align='center' style={{ marginTop: 12 }}>
            Recipes
          </Text>
        </Grid>
        {response?.results.map((r) => (
          <Grid item key={r.id} xs={12} sm={6} md={6} lg={4}>
            <Recipe recipe={r} />
          </Grid>
        ))}
      </Grid>
      <Pagination count={response?.count} />
    </>
  );
};

export default memo(RenderAuthorRecipes);

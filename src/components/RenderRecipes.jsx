import { Button, Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import Spinner from './Spinner';
import FSError from './FullScreenError';
import Pagination from './Pagination';
import Recipe from './Recipe';

const RenderRecipes = () => {
  const { search } = useLocation();
  const [{ loading, response, error }, retry] = useAxios(`/recipes/${search}`);

  if (loading) return <Spinner />;

  if (error || response.results?.length === 0)
    return (
      <FSError
        icon='error'
        action={error && <Button onClick={retry}>Retry</Button>}
      >
        {error ?? 'No recipes found'}
      </FSError>
    );

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: 12 }}>
        {response.results?.map((r) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={r.id}>
            <Recipe recipe={r} />
          </Grid>
        ))}
      </Grid>
      <Pagination count={response?.count} />
    </>
  );
};

export default RenderRecipes;

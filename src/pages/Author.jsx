import { Grid } from '@material-ui/core';
import AuthorDetails from '../components/AuthorDetails';
import RenderAuthorRecipes from '../components/RenderAuthorRecipes';

const Author = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <AuthorDetails />
      </Grid>
      <Grid item xs={12} md={9}>
        <RenderAuthorRecipes />
      </Grid>
    </Grid>
  );
};

export default Author;

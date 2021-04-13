import { Box } from '@material-ui/core';
import RecipeFilters from '../components/RecipeFilters';
import RecipeSortingMenu from '../components/RecipeSortingMenu';
import SearchBar from '../components/SearchBar';
import RenderRecipes from '../components/RenderRecipes';

const Recipes = () => (
  <div>
    <SearchBar placeholder='Search recipes...' />
    <Box display='flex' marginTop={2} justifyContent='space-between'>
      <RecipeFilters />
      <RecipeSortingMenu />
    </Box>
    <RenderRecipes />
  </div>
);

export default Recipes;

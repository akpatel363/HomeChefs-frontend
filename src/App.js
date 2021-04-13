import { Container } from '@material-ui/core';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import Author from './pages/Author';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';
import PostRecipe from './pages/PostRecipe';
import MyRecipeDetails from './pages/MyRecipeDetails';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Container>
        <Switch>
          <Route exact path='/recipes' component={Recipes} />
          <Route path='/recipes/:id' component={RecipeDetails} />
          <Route path='/author/:id' component={Author} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <PrivateRoute
            allow={isAuthenticated}
            path='/dashboard'
            component={Dashboard}
          />
          <PrivateRoute
            allow={isAuthenticated}
            path='/profile/edit'
            component={EditProfile}
          />
          <PrivateRoute
            allow={isAuthenticated}
            path='/post/recipe'
            component={PostRecipe}
          />
          <PrivateRoute
            allow={isAuthenticated}
            path='/my/:id'
            component={MyRecipeDetails}
          />
          <Redirect to='/recipes' />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;

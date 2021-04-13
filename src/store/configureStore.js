import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import taskReducer from './reducers/ taskReducer';
import activeRecipeReducer from './reducers/activeRecipeReducer';
import ratingsReducer from './reducers/ratingsReducer';
import questionsReducer from './reducers/questionsReducer';
import myRecipesReducer from './reducers/myRecipesReducer';

export default function configureStore() {
  const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
      typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    combineReducers({
      auth: authReducer,
      task: taskReducer,
      activeRecipe: activeRecipeReducer,
      ratings: ratingsReducer,
      questions: questionsReducer,
      myRecipes: myRecipesReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}

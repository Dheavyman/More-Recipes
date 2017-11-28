import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './homepage/Home';
import Recipe from './recipe/Recipe';
import UserRecipes from './userRecipes/UserRecipes';
import '../public/style.scss';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/recipes/:recipeId" component={Recipe} />
    <Route path="/user/recipes" component={UserRecipes} />
  </Switch>
);

export default App;

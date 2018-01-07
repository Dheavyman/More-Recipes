import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './homepage/Home';
import Recipe from './singleRecipePage/Recipe';
import UserDashboard from './userRecipes/UserRecipes';
import '../public/style.scss';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/recipes/:recipeId" component={Recipe} />
    <Route path="/users/:userId/dashboard" component={UserDashboard} />
  </Switch>
);

export default App;

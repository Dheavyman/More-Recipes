import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './homepage/Home';
import Recipe from './singleRecipePage/Recipe';
import UserDashboard from './userRecipes/UserRecipes';
import '../public/style.scss';

const propTypes = {
  location: PropTypes.shape(),
};

const defaultProps = {
  location: undefined,
};

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/recipes/:recipeId" component={Recipe} />
    <Route
      path="/users/:userId/dashboard"
      render={props => (localStorage.getItem('token')
        ? <UserDashboard {...props} />
        : <Redirect to={{
          pathname: '/',
          state: {
            from: props.location
          }
        }}
        />)
      }
    />
  </Switch>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;

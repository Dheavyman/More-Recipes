import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomePage from './homepage';
import CatalogPage from './catalogPage';
import SingleRecipePage from './singleRecipePage';
import UserDashboardPage from './userRecipes';
import NotFoundPage from './notFoundPage';
import { decodeToken } from '../utils/authenticate';
import '../public/style.scss';

const propTypes = {
  location: PropTypes.shape(),
};

const defaultProps = {
  location: undefined,
};

/**
 * App component
 *
 * @returns {any} - Navigate to the matched route
 */
const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/catalog" component={CatalogPage} />
    <Route exact path="/recipes/:recipeId" component={SingleRecipePage} />
    <Route
      path="/users/:userId/dashboard"
      render={props => (decodeToken()
        ? <UserDashboardPage {...props} />
        : <Redirect to={{
          pathname: '/',
          state: {
            from: props.location
          }
        }}
        />)
      }
    />
    <Route component={NotFoundPage} />
  </Switch>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;

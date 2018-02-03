import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './homepage';
import singleRecipePage from './singleRecipePage';
import UserDashboard from './userRecipes/UserRecipes';
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
 * @returns {any} - Link to the matched page
 */
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/recipes/:recipeId" component={singleRecipePage} />
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

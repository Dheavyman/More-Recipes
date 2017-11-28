import React from 'react';

import common from '../common';
import Header from './Header';
import Main from './Main';

const { Footer } = common;

/**
 * Class representing user recipes
 *
 * @class UserRecipes
 * @extends {React.Component}
 */
class UserRecipes extends React.Component {
  /**
   * Component did mount life cycle method
   *
   * @returns {function} Call the API
   * @memberof UserRecipes
   */
  componentDidMount() {
    // console.log('User recipes mounted');
  }

  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof UserRecipes
   */
  render() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default UserRecipes;

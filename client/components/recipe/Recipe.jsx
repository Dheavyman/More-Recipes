import React from 'react';

import common from '../common';
import Main from './Main';

const { Header, Footer } = common;

/**
 * Class representing recipe details page
 *
 * @class Recipe
 * @extends {React.Component}
 */
class Recipe extends React.Component {
  /**
   * Component did mount
   *
   * @returns {object} React element
   * @memberof Recipe
   */
  componentDidMount() {
    console.log('Mounted');
    // Initialize materialize css parallax class
    $('.parallax').parallax();
  }
  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof Recipe
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

export default Recipe;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RecipeCatalogCard from '../common/RecipeCatalogCard';

const propTypes = {
  recipes: PropTypes.shape({
    popularRecipes: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
  retrievePopularRecipes: PropTypes.func.isRequired,
};

/**
 * Class representing Popular recipes component
 *
 * @class PopularRecipesCatalog
 * @extends {Component}
 */
class PopularRecipesCatalog extends Component {
  /**
   * ComponentDidMount lifecyle method
   *
   * @returns {any} - Call the action to fetch popular recipes
   * @memberof PopularRecipesCatalog
   */
  componentDidMount() {
    const { retrievePopularRecipes } = this.props;

    retrievePopularRecipes();
  }
  /**
   * Render function
   *
   * @returns {object} React element
   * @memberof PopularRecipesCatalog
   */
  render() {
    const { recipes: { popularRecipes } } = this.props;

    return (
      <div className="row">
        <div className="col s12 popular-recipes" >
          <h4>Popular Recipes</h4>
        </div>
        {popularRecipes && popularRecipes.map((recipe, index) => (
          <RecipeCatalogCard
            key={recipe.id}
            index={index}
            recipe={recipe}
            {...this.props}
          />
        ))}
      </div>
    );
  }
}

PopularRecipesCatalog.propTypes = propTypes;

export default PopularRecipesCatalog;

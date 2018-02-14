import React from 'react';
import PropTypes from 'prop-types';

import PopularRecipesCatalog from './PopularRecipesCatalog';
import AllRecipeCatalog from './AllRecipeCatalog';
import SearchBar from '../common/SearchBar';
import Slider from './Slider';

const propTypes = {
  recipes: PropTypes.shape({
    recipes: PropTypes.arrayOf(PropTypes.shape()),
    popularRecipes: PropTypes.arrayOf(PropTypes.shape()),
  }),
};

const defaultProps = {
  recipes: undefined,
};

/**
 * Main component
 *
 * @param {object} props - The properties passed to the component
 *
 * @returns {object} React element
 */
const Main = (props) => {
  const { recipes: { recipes, popularRecipes } } = props;

  return (
    <div>
      <div id="position">
        <Slider />
        <SearchBar
          id={'home-search-bar'}
          {...props}
        />
      </div>
      <div className="grey lighten-3" >
        <div className="row recipes-list">
          <div className="col s12 popular-list white">
            <PopularRecipesCatalog popularRecipes={popularRecipes} {...props} />
          </div>
          <div className="col s12 all-recipes-list white">
            <AllRecipeCatalog recipesCatalog={recipes} />
          </div>
        </div>
      </div>
    </div>
  );
};

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;

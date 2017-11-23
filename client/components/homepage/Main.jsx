import React from 'react';
import PropTypes from 'prop-types';

import PopularRecipes from './PopularRecipes';
import RecipeCatalog from './RecipeCatalog';
import SearchBar from './SearchBar';
import Slider from './Slider';

const Main = (props) => {
  const { recipes } = props.recipes;
  return (
    <main>
      <div id="position">
        <Slider />
        <SearchBar />
      </div>
      <div className="row">
        <div className="col s12 m5 l4 push-m7 push-l8">
          <PopularRecipes />
        </div>
        <div className="col s12 m7 l8 pull-m5 pull-l4">
          <RecipeCatalog recipesCatalog={recipes} />
        </div>
      </div>
    </main>
  );
};

Main.propTypes = {
  recipes: PropTypes.shape({
    recipes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      category: PropTypes.string,
      description: PropTypes.string,
      preparationTime: PropTypes.number,
      ingredients: PropTypes.string,
      directions: PropTypes.string,
    }))
  }),
};

Main.defaultProps = {
  recipes: undefined,
};

export default Main;

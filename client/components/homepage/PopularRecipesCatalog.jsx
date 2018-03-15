import React from 'react';
import PropTypes from 'prop-types';

import RecipeCatalogCard from '../common/RecipeCatalogCard';
import Spinner from '../common/Spinner';

const propTypes = {
  recipes: PropTypes.shape({
    isFetchingPopularRecipes: PropTypes.bool,
    popularRecipes: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

/**
 * Popular recipes component
 *
 * @param {object} props - Properties passed to the component
 *
 * @returns {object} React element
 */
const PopularRecipesCatalog = (props) => {
  const { recipes: { isFetchingPopularRecipes, popularRecipes } } = props;

  return (
    <div className="row">
      <div className="col s12 popular-recipes" >
        <h4>Popular Recipes</h4>
      </div>
      {isFetchingPopularRecipes
        ? <div className="center-align">
          <Spinner size="big" />
        </div>
        : <div>
          {popularRecipes && popularRecipes.map((recipe, index) => (
            <RecipeCatalogCard
              key={recipe.id}
              index={index}
              recipe={recipe}
              {...props}
            />
          ))}
        </div>
      }
    </div>
  );
};

PopularRecipesCatalog.propTypes = propTypes;

export default PopularRecipesCatalog;
